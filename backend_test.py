#!/usr/bin/env python3
"""
Backend API Testing for Solve Automations AI Call Assistant
Tests all API endpoints for functionality and integration
"""

import requests
import sys
import json
from datetime import datetime, date, timedelta
from typing import Dict, Any

class SolveAutomationsAPITester:
    def __init__(self, base_url="https://call-genius-5.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name: str, success: bool, details: str = ""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
        
        result = {
            "test": name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} - {name}")
        if details:
            print(f"    {details}")

    def run_test(self, name: str, method: str, endpoint: str, expected_status: int, data: Dict = None, params: Dict = None) -> tuple:
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)
            
            success = response.status_code == expected_status
            
            if success:
                try:
                    response_data = response.json()
                except:
                    response_data = {}
                self.log_test(name, True, f"Status: {response.status_code}")
                return True, response_data
            else:
                self.log_test(name, False, f"Expected {expected_status}, got {response.status_code}")
                return False, {}
                
        except requests.exceptions.RequestException as e:
            self.log_test(name, False, f"Request failed: {str(e)}")
            return False, {}

    def test_health_check(self):
        """Test API health check"""
        success, response = self.run_test(
            "API Health Check",
            "GET", 
            "",
            200
        )
        return success and response.get("status") == "healthy"

    def test_create_lead(self):
        """Test lead creation via contact form"""
        test_lead = {
            "name": "Test User",
            "email": f"test_{datetime.now().strftime('%H%M%S')}@example.com",
            "company": "Test Company",
            "message": "This is a test message for lead generation"
        }
        
        success, response = self.run_test(
            "Create Lead (Contact Form)",
            "POST",
            "leads",
            200,
            data=test_lead
        )
        
        if success:
            # Verify response structure
            required_fields = ["id", "name", "email", "created_at"]
            missing_fields = [field for field in required_fields if field not in response]
            if missing_fields:
                self.log_test("Lead Response Structure", False, f"Missing fields: {missing_fields}")
                return False, None
            return True, response.get("id")
        return False, None

    def test_get_leads(self):
        """Test retrieving leads"""
        success, response = self.run_test(
            "Get All Leads",
            "GET",
            "leads",
            200
        )
        
        if success and isinstance(response, list):
            self.log_test("Leads List Structure", True, f"Found {len(response)} leads")
            return True
        return False

    def test_create_booking(self):
        """Test booking creation"""
        # Use tomorrow's date
        tomorrow = date.today() + timedelta(days=1)
        test_booking = {
            "name": "Test Booking User",
            "email": f"booking_{datetime.now().strftime('%H%M%S')}@example.com",
            "phone": "+1234567890",
            "company": "Test Booking Company",
            "date": tomorrow.strftime("%Y-%m-%d"),
            "time": "10:00",
            "notes": "Test booking for API validation"
        }
        
        success, response = self.run_test(
            "Create Booking",
            "POST",
            "bookings",
            200,
            data=test_booking
        )
        
        if success:
            # Verify response structure
            required_fields = ["id", "name", "email", "date", "time", "status"]
            missing_fields = [field for field in required_fields if field not in response]
            if missing_fields:
                self.log_test("Booking Response Structure", False, f"Missing fields: {missing_fields}")
                return False, None
            return True, response.get("id")
        return False, None

    def test_get_bookings(self):
        """Test retrieving bookings"""
        success, response = self.run_test(
            "Get All Bookings",
            "GET",
            "bookings",
            200
        )
        
        if success and isinstance(response, list):
            self.log_test("Bookings List Structure", True, f"Found {len(response)} bookings")
            return True
        return False

    def test_available_slots(self):
        """Test available time slots endpoint"""
        # Test with tomorrow's date
        tomorrow = date.today() + timedelta(days=1)
        test_date = tomorrow.strftime("%Y-%m-%d")
        
        success, response = self.run_test(
            "Get Available Slots",
            "GET",
            "bookings/available-slots",
            200,
            params={"date": test_date}
        )
        
        if success:
            # Verify response structure
            if "date" in response and "available_slots" in response:
                slots = response["available_slots"]
                if isinstance(slots, list):
                    self.log_test("Available Slots Structure", True, f"Found {len(slots)} available slots")
                    return True
                else:
                    self.log_test("Available Slots Structure", False, "available_slots is not a list")
            else:
                self.log_test("Available Slots Structure", False, "Missing required fields")
        return False

    def test_initiate_demo_call(self):
        """Test demo call initiation (mocked)"""
        test_call = {
            "phone_number": "+1234567890",
            "call_type": "demo"
        }
        
        success, response = self.run_test(
            "Initiate Demo Call",
            "POST",
            "calls/initiate",
            200,
            data=test_call
        )
        
        if success:
            # Verify response structure and mock status
            required_fields = ["id", "phone_number", "status", "timestamp"]
            missing_fields = [field for field in required_fields if field not in response]
            if missing_fields:
                self.log_test("Call Response Structure", False, f"Missing fields: {missing_fields}")
                return False
            
            # Check if it's properly mocked
            if response.get("status") in ["mock_initiated", "initiated"]:
                self.log_test("Mock Call Status", True, f"Status: {response.get('status')}")
                return True
            else:
                self.log_test("Mock Call Status", False, f"Unexpected status: {response.get('status')}")
        return False

    def test_get_call_logs(self):
        """Test retrieving call logs"""
        success, response = self.run_test(
            "Get Call Logs",
            "GET",
            "calls",
            200
        )
        
        if success and isinstance(response, list):
            self.log_test("Call Logs Structure", True, f"Found {len(response)} call logs")
            return True
        return False

    def test_telephony_status(self):
        """Test telephony configuration status"""
        success, response = self.run_test(
            "Get Telephony Status",
            "GET",
            "calls/status",
            200
        )
        
        if success:
            # Verify response structure
            required_fields = ["configured", "mode", "message"]
            missing_fields = [field for field in required_fields if field not in response]
            if missing_fields:
                self.log_test("Telephony Status Structure", False, f"Missing fields: {missing_fields}")
                return False
            
            # Should be in mock mode for this test
            if response.get("mode") == "mock":
                self.log_test("Mock Mode Verification", True, "Telephony correctly in mock mode")
                return True
            else:
                self.log_test("Mock Mode Verification", False, f"Expected mock mode, got: {response.get('mode')}")
        return False

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Solve Automations API Tests")
        print("=" * 50)
        
        # Core API tests
        self.test_health_check()
        
        # Lead management tests
        lead_success, lead_id = self.test_create_lead()
        self.test_get_leads()
        
        # Booking management tests
        booking_success, booking_id = self.test_create_booking()
        self.test_get_bookings()
        self.test_available_slots()
        
        # Demo call tests (mocked Twilio)
        self.test_initiate_demo_call()
        self.test_get_call_logs()
        self.test_telephony_status()
        
        # Print summary
        print("\n" + "=" * 50)
        print(f"📊 Test Summary: {self.tests_passed}/{self.tests_run} tests passed")
        
        success_rate = (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0
        print(f"📈 Success Rate: {success_rate:.1f}%")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed! Backend API is working correctly.")
            return 0
        else:
            print("⚠️  Some tests failed. Check the details above.")
            return 1

def main():
    tester = SolveAutomationsAPITester()
    return tester.run_all_tests()

if __name__ == "__main__":
    sys.exit(main())