from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(title="Solve Automations API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ===================== MODELS =====================

# Lead Model
class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    company: Optional[str] = None
    message: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class LeadCreate(BaseModel):
    name: str
    email: str
    company: Optional[str] = None
    message: Optional[str] = None

# Booking Model
class Booking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    company: Optional[str] = None
    date: str  # ISO date string
    time: str  # Time slot string
    notes: Optional[str] = None
    status: str = "pending"  # pending, confirmed, cancelled
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class BookingCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    company: Optional[str] = None
    date: str
    time: str
    notes: Optional[str] = None

# Call Log Model (for demo calls - mocked Twilio)
class CallLog(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    phone_number: str
    call_type: str = "demo"  # demo, inbound, outbound
    status: str = "initiated"  # initiated, ringing, answered, completed, failed
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    duration_seconds: Optional[int] = None
    notes: Optional[str] = None

class CallInitiate(BaseModel):
    phone_number: str
    call_type: str = "demo"

# ===================== ROUTES =====================

# Health check
@api_router.get("/")
async def root():
    return {"message": "Solve Automations API", "status": "healthy"}

# -------- LEADS --------
@api_router.post("/leads", response_model=Lead)
async def create_lead(input: LeadCreate):
    """Create a new lead from contact form"""
    lead_obj = Lead(**input.model_dump())
    doc = lead_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.leads.insert_one(doc)
    logger.info(f"New lead created: {lead_obj.email}")
    return lead_obj

@api_router.get("/leads", response_model=List[Lead])
async def get_leads():
    """Get all leads"""
    leads = await db.leads.find({}, {"_id": 0}).to_list(1000)
    for lead in leads:
        if isinstance(lead.get('created_at'), str):
            lead['created_at'] = datetime.fromisoformat(lead['created_at'])
    return leads

# -------- BOOKINGS --------
@api_router.post("/bookings", response_model=Booking)
async def create_booking(input: BookingCreate):
    """Create a new booking"""
    booking_obj = Booking(**input.model_dump())
    doc = booking_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.bookings.insert_one(doc)
    logger.info(f"New booking created: {booking_obj.email} for {booking_obj.date} at {booking_obj.time}")
    return booking_obj

@api_router.get("/bookings", response_model=List[Booking])
async def get_bookings():
    """Get all bookings"""
    bookings = await db.bookings.find({}, {"_id": 0}).to_list(1000)
    for booking in bookings:
        if isinstance(booking.get('created_at'), str):
            booking['created_at'] = datetime.fromisoformat(booking['created_at'])
    return bookings

@api_router.get("/bookings/available-slots")
async def get_available_slots(date: str):
    """Get available time slots for a specific date"""
    # All possible time slots
    all_slots = [
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
    ]
    
    # Get booked slots for the date
    booked = await db.bookings.find(
        {"date": date, "status": {"$ne": "cancelled"}},
        {"_id": 0, "time": 1}
    ).to_list(100)
    
    booked_times = [b['time'] for b in booked]
    available = [slot for slot in all_slots if slot not in booked_times]
    
    return {"date": date, "available_slots": available}

# -------- DEMO CALLS (MOCKED TWILIO) --------
@api_router.post("/calls/initiate", response_model=CallLog)
async def initiate_demo_call(input: CallInitiate):
    """
    Initiate a demo call (MOCKED - will log the attempt).
    In production, this would integrate with Twilio Voice API.
    """
    # Check for Twilio credentials (mocked for now)
    twilio_sid = os.environ.get('TWILIO_ACCOUNT_SID')
    twilio_token = os.environ.get('TWILIO_AUTH_TOKEN')
    
    if not twilio_sid or not twilio_token:
        # Mock mode - just log the call attempt
        call_obj = CallLog(
            phone_number=input.phone_number,
            call_type=input.call_type,
            status="mock_initiated",
            notes="Twilio not configured - call logged only"
        )
    else:
        # In production, here we would call Twilio API
        # For now, still mock but indicate Twilio is configured
        call_obj = CallLog(
            phone_number=input.phone_number,
            call_type=input.call_type,
            status="initiated",
            notes="Twilio configured - real call would be placed"
        )
    
    doc = call_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.call_logs.insert_one(doc)
    logger.info(f"Demo call initiated to: {input.phone_number}")
    
    return call_obj

@api_router.get("/calls", response_model=List[CallLog])
async def get_call_logs():
    """Get all call logs"""
    calls = await db.call_logs.find({}, {"_id": 0}).to_list(1000)
    for call in calls:
        if isinstance(call.get('timestamp'), str):
            call['timestamp'] = datetime.fromisoformat(call['timestamp'])
    return calls

@api_router.get("/calls/status")
async def get_telephony_status():
    """
    Check if telephony is properly configured.
    Returns status and whether real calls can be made.
    """
    twilio_sid = os.environ.get('TWILIO_ACCOUNT_SID')
    twilio_token = os.environ.get('TWILIO_AUTH_TOKEN')
    twilio_phone = os.environ.get('TWILIO_PHONE_NUMBER')
    
    return {
        "configured": bool(twilio_sid and twilio_token),
        "has_phone_number": bool(twilio_phone),
        "mode": "production" if (twilio_sid and twilio_token) else "mock",
        "message": "Twilio configured and ready" if (twilio_sid and twilio_token) else "Running in mock mode - calls are logged but not placed"
    }

# -------- PLACEHOLDER ROUTES FOR FUTURE SaaS --------
@api_router.get("/placeholder/login")
async def login_placeholder():
    """Placeholder for future customer login"""
    return {"message": "Login functionality coming soon", "status": "planned"}

@api_router.get("/placeholder/dashboard")
async def dashboard_placeholder():
    """Placeholder for future customer dashboard"""
    return {"message": "Dashboard functionality coming soon", "status": "planned"}

@api_router.get("/placeholder/usage")
async def usage_placeholder():
    """Placeholder for future usage/credits system"""
    return {"message": "Usage tracking coming soon", "status": "planned"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
