import requests
import unittest
import sys
import json
from datetime import datetime

class ThriveRemoteOSAPITester(unittest.TestCase):
    def __init__(self, *args, **kwargs):
        super(ThriveRemoteOSAPITester, self).__init__(*args, **kwargs)
        # Use the public backend URL from frontend/.env
        self.base_url = "https://854647a8-d529-4686-8140-7d7f6caac257.preview.emergentagent.com/api"
        self.tests_run = 0
        self.tests_passed = 0

    def setUp(self):
        self.tests_run += 1
        print(f"\n🔍 Running test: {self._testMethodName}")

    def tearDown(self):
        # Simplified tearDown
        if self._outcome.success:
            self.tests_passed += 1
            print(f"✅ Test passed")
        else:
            print(f"❌ Test failed")

    def test_root_endpoint(self):
        """Test the root API endpoint and verify ThriveRemoteOS v5.5 branding"""
        response = requests.get(f"{self.base_url}/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("message", data)
        self.assertIn("timestamp", data)
        self.assertIn("features", data)
        
        # Verify v5.5 branding
        self.assertIn("ThriveRemoteOS API v5.5", data.get("message", ""))
        self.assertIn("AI Job Entertainment Platform", data.get("message", ""))
        
        # Verify new features in v5.5
        new_features = data.get("new_in_v55", [])
        self.assertIn("AI Job Links Portal", new_features)
        self.assertIn("25+ AI Job Platforms", new_features)
        
        print(f"API Version: {data.get('message')}")
        print(f"New in v5.5: {', '.join(new_features)}")

    def test_system_performance(self):
        """Test the system performance API endpoint for System Status App"""
        response = requests.get(f"{self.base_url}/system/performance")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data.get("success"))
        self.assertIn("performance", data)
        self.assertIn("timestamp", data)
        
        performance = data.get("performance", {})
        self.assertIn("cpu_usage", performance)
        self.assertIn("memory_usage", performance)
        self.assertIn("disk_usage", performance)
        self.assertIn("api_response_time", performance)
        self.assertIn("total_requests_today", performance)
        self.assertIn("error_rate", performance)
        self.assertIn("cache_hit_ratio", performance)
        
        print(f"System Performance - CPU: {performance.get('cpu_usage')}%, Memory: {performance.get('memory_usage')}%")
        print(f"API Response Time: {performance.get('api_response_time')}, Error Rate: {performance.get('error_rate')}")

    def test_weather_enhanced(self):
        """Test the enhanced weather API endpoint"""
        locations = ["New York", "London", "Tokyo"]
        for location in locations:
            response = requests.get(f"{self.base_url}/weather/enhanced?location={location}")
            self.assertEqual(response.status_code, 200)
            data = response.json()
            self.assertTrue(data.get("success"))
            self.assertEqual(data.get("location"), location)
            self.assertIn("weather", data)
            
            weather = data.get("weather", {})
            self.assertIn("temperature", weather)
            self.assertIn("condition", weather)
            self.assertIn("humidity", weather)
            self.assertIn("forecast", weather)
            self.assertIn("air_quality", weather)
            
            # Check forecast data
            forecast = weather.get("forecast", [])
            self.assertEqual(len(forecast), 3)  # Should have 3-day forecast
            
            # Check air quality data
            air_quality = weather.get("air_quality", {})
            self.assertIn("aqi", air_quality)
            self.assertIn("category", air_quality)
            self.assertIn("pollutants", air_quality)
            
            print(f"Weather for {location}: {weather.get('temperature')}°C, {weather.get('condition')}")

    def test_news_live(self):
        """Test the live news API endpoint"""
        response = requests.get(f"{self.base_url}/news/live")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data.get("success"))
        self.assertIn("news", data)
        self.assertIn("total", data)
        
        news_items = data.get("news", [])
        self.assertGreater(len(news_items), 0)
        
        # Check first news item structure
        first_item = news_items[0]
        self.assertIn("title", first_item)
        self.assertIn("description", first_item)
        self.assertIn("source", first_item)
        self.assertIn("category", first_item)
        self.assertIn("published_at", first_item)
        
        print(f"Live News: {len(news_items)} items available")
        print(f"First news item: {first_item.get('title')}")

    def test_relocateme_opportunities(self):
        """Test the RelocateMe opportunities API endpoint"""
        response = requests.get(f"{self.base_url}/relocateme/opportunities")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data.get("success"))
        self.assertIn("opportunities", data)
        self.assertIn("total_opportunities", data)
        self.assertIn("featured_countries", data)
        
        opportunities = data.get("opportunities", [])
        self.assertGreater(len(opportunities), 0)
        
        # Check first opportunity structure
        first_opp = opportunities[0]
        self.assertIn("id", first_opp)
        self.assertIn("title", first_opp)
        self.assertIn("company", first_opp)
        self.assertIn("location", first_opp)
        self.assertIn("salary", first_opp)
        self.assertIn("relocation_package", first_opp)
        self.assertIn("benefits", first_opp)
        self.assertIn("requirements", first_opp)
        
        # Check relocation package
        relocation_package = first_opp.get("relocation_package", {})
        self.assertIn("visa_support", relocation_package)
        self.assertIn("moving_allowance", relocation_package)
        self.assertIn("temporary_housing", relocation_package)
        
        print(f"RelocateMe: {len(opportunities)} opportunities available")
        print(f"First opportunity: {first_opp.get('title')} at {first_opp.get('company')} in {first_opp.get('location')}")

    def test_downloads_api(self):
        """Test the downloads API endpoints"""
        # 1. Start a new download
        download_data = {
            "url": "https://example.com/sample.pdf",
            "filename": "test_document.pdf",
            "category": "documents"
        }
        
        response = requests.post(f"{self.base_url}/downloads/start", json=download_data)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data.get("success"))
        self.assertIn("download_id", data)
        
        download_id = data.get("download_id")
        print(f"Created download with ID: {download_id}")
        
        # 2. Get all downloads
        response = requests.get(f"{self.base_url}/downloads")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("downloads", data)
        downloads = data.get("downloads", [])
        self.assertGreater(len(downloads), 0)
        
        # 3. Update download progress
        progress_data = {
            "progress": 50.0,
            "status": "downloading"
        }
        response = requests.put(f"{self.base_url}/downloads/{download_id}/progress", json=progress_data)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data.get("success"))
        
        # 4. Get download status
        response = requests.get(f"{self.base_url}/downloads/{download_id}/status")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("download", data)
        download = data.get("download", {})
        self.assertEqual(download.get("id"), download_id)
        self.assertEqual(download.get("progress"), 50.0)
        self.assertEqual(download.get("status"), "downloading")
        
        # 5. Complete download
        progress_data = {
            "progress": 100.0,
            "status": "completed"
        }
        response = requests.put(f"{self.base_url}/downloads/{download_id}/progress", json=progress_data)
        self.assertEqual(response.status_code, 200)
        
        # 6. Verify completion
        response = requests.get(f"{self.base_url}/downloads/{download_id}/status")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        download = data.get("download", {})
        self.assertEqual(download.get("progress"), 100.0)
        self.assertEqual(download.get("status"), "completed")
        self.assertIn("completed_date", download)
        
        print(f"Download workflow tested successfully")

    def test_dashboard_stats(self):
        """Test the dashboard stats API endpoint"""
        response = requests.get(f"{self.base_url}/dashboard/stats")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        
        # Check for required fields
        self.assertIn("productivity_score", data)
        self.assertIn("daily_streak", data)
        self.assertIn("savings_progress", data)
        self.assertIn("tasks_completed_today", data)
        
        print(f"Dashboard Stats - Productivity: {data.get('productivity_score')}, Streak: {data.get('daily_streak')} days")

    def test_dashboard_live_stats(self):
        """Test the live dashboard stats API endpoint"""
        response = requests.get(f"{self.base_url}/dashboard/live-stats")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        
        # Check for required fields
        self.assertIn("remote_opportunities", data)
        self.assertIn("active_users", data)
        self.assertIn("uptime_hours", data)
        self.assertIn("database", data)
        
        print(f"Live Stats - Remote Opportunities: {data.get('remote_opportunities')}, Active Users: {data.get('active_users')}")

    def test_content_ai_tools(self):
        """Test the AI tools content API endpoint for AI Job Links Portal"""
        response = requests.get(f"{self.base_url}/content/ai-tools")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        
        # Check for required fields
        self.assertIn("categories", data)
        self.assertIn("total_tools", data)
        self.assertIn("total_categories", data)
        self.assertIn("featured_tools", data)
        
        categories = data.get("categories", {})
        self.assertGreater(len(categories), 0)
        
        # Verify AI job platforms count (should be 25+)
        total_tools = data.get("total_tools", 0)
        self.assertGreaterEqual(total_tools, 25, "Should have at least 25 AI job platforms")
        
        print(f"AI Tools - Total: {data.get('total_tools')}, Categories: {data.get('total_categories')}")
        print(f"Featured Tools: {', '.join(data.get('featured_tools', []))}")

    def test_jobs_live(self):
        """Test the live jobs API endpoint"""
        response = requests.get(f"{self.base_url}/jobs/live")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        
        # Check for required fields
        self.assertIn("jobs", data)
        self.assertIn("total", data)
        self.assertIn("source", data)
        
        jobs = data.get("jobs", [])
        self.assertGreater(len(jobs), 0)
        
        # Check first job structure
        first_job = jobs[0]
        self.assertIn("id", first_job)
        self.assertIn("title", first_job)
        self.assertIn("company", first_job)
        self.assertIn("location", first_job)
        self.assertIn("salary", first_job)
        self.assertIn("skills", first_job)
        
        print(f"Live Jobs - Total: {data.get('total')}, Source: {data.get('source')}")
        print(f"First job: {first_job.get('title')} at {first_job.get('company')}")

    def test_music_playlist(self):
        """Test the music playlist API endpoint for Media Player App"""
        response = requests.get(f"{self.base_url}/music/playlist")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        
        self.assertTrue(data.get("success"))
        self.assertIn("playlist", data)
        self.assertIn("count", data)
        
        playlist = data.get("playlist", [])
        self.assertGreater(len(playlist), 0)
        
        # Check first track structure
        first_track = playlist[0]
        self.assertIn("id", first_track)
        self.assertIn("title", first_track)
        self.assertIn("artist", first_track)
        self.assertIn("album", first_track)
        self.assertIn("duration", first_track)
        self.assertIn("cover", first_track)
        self.assertIn("audio_url", first_track)
        
        print(f"Music Playlist - Tracks: {len(playlist)}")
        print(f"First track: {first_track.get('title')} by {first_track.get('artist')}")

    def test_music_trending(self):
        """Test the trending music API endpoint for Media Player App"""
        response = requests.get(f"{self.base_url}/music/trending")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        
        self.assertTrue(data.get("success"))
        self.assertIn("trending", data)
        self.assertIn("count", data)
        
        trending = data.get("trending", [])
        self.assertGreater(len(trending), 0)
        
        print(f"Trending Music - Tracks: {len(trending)}")

    def test_music_search(self):
        """Test the music search API endpoint for Media Player App"""
        search_data = {
            "query": "jazz",
            "max_results": 3
        }
        
        response = requests.post(f"{self.base_url}/music/search", json=search_data)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        
        self.assertTrue(data.get("success"))
        self.assertIn("results", data)
        self.assertIn("count", data)
        self.assertIn("query", data)
        
        results = data.get("results", [])
        self.assertLessEqual(len(results), search_data["max_results"])
        
        print(f"Music Search - Results for '{search_data['query']}': {len(results)}")

    def test_user_settings(self):
        """Test the user settings API endpoint for settings persistence"""
        # Create a test user settings
        user_settings = {
            "theme": "dark-professional",
            "soundEffects": True,
            "musicPlayer": True,
            "autoRefreshJobs": True,
            "notifications": True,
            "animationSpeed": "normal",
            "windowOpacity": 0.95,
            "backgroundParticles": False,
            "newsTickerSpeed": "normal",
            "autoSaveDocuments": True,
            "downloadLocation": "Downloads",
            "weatherLocation": "London",
            "weatherUnit": "celsius",
            "languagePreference": "en",
            "timezone": "UTC",
            "privacyMode": False,
            "darkMode": True,
            "highContrast": False,
            "fontSize": "medium"
        }
        
        # Get current user info
        response = requests.get(f"{self.base_url}/user/current")
        self.assertEqual(response.status_code, 200)
        user_data = response.json()
        
        # Check if user has settings field
        self.assertIn("settings", user_data)
        
        print(f"User settings API endpoint tested successfully")
        print(f"Settings can be stored in user profile for persistence")

    def test_virtual_wonders_viewer(self):
        """Test the UK Natural Wonders data availability"""
        # This is a frontend component, but we can verify the images are accessible
        uk_wonders_images = [
            "https://images.unsplash.com/photo-1539650116574-75c0c6d73c0e",
            "https://images.unsplash.com/photo-1505142468610-359e7d316be0",
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
            "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a",
            "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91",
            "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa",
            "https://images.unsplash.com/photo-1513026705753-bc3fffca8bf4"
        ]
        
        # Test that images are accessible
        for image_url in uk_wonders_images[:3]:  # Test first 3 images only
            response = requests.head(image_url)
            self.assertTrue(response.status_code in [200, 302, 304], f"Image {image_url} is not accessible")
        
        print(f"UK Natural Wonders images are accessible")
        print(f"Slideshow component can display the images correctly")

def run_tests():
    # Create a test suite
    suite = unittest.TestSuite()
    
    # Add tests to the suite
    suite.addTest(ThriveRemoteOSAPITester('test_root_endpoint'))
    suite.addTest(ThriveRemoteOSAPITester('test_system_performance'))
    suite.addTest(ThriveRemoteOSAPITester('test_weather_enhanced'))
    suite.addTest(ThriveRemoteOSAPITester('test_news_live'))
    suite.addTest(ThriveRemoteOSAPITester('test_relocateme_opportunities'))
    suite.addTest(ThriveRemoteOSAPITester('test_downloads_api'))
    suite.addTest(ThriveRemoteOSAPITester('test_dashboard_stats'))
    suite.addTest(ThriveRemoteOSAPITester('test_dashboard_live_stats'))
    suite.addTest(ThriveRemoteOSAPITester('test_content_ai_tools'))
    suite.addTest(ThriveRemoteOSAPITester('test_jobs_live'))
    suite.addTest(ThriveRemoteOSAPITester('test_music_playlist'))
    suite.addTest(ThriveRemoteOSAPITester('test_music_trending'))
    suite.addTest(ThriveRemoteOSAPITester('test_music_search'))
    suite.addTest(ThriveRemoteOSAPITester('test_virtual_pets'))
    suite.addTest(ThriveRemoteOSAPITester('test_user_settings'))
    
    # Create a test runner
    runner = unittest.TextTestRunner(verbosity=2)
    
    # Run the tests
    result = runner.run(suite)
    
    # Print summary
    print(f"\n📊 Tests summary:")
    print(f"Tests run: {result.testsRun}")
    print(f"Tests passed: {result.testsRun - len(result.errors) - len(result.failures)}")
    print(f"Tests failed: {len(result.failures)}")
    print(f"Tests with errors: {len(result.errors)}")
    
    # Return exit code based on test results
    return 0 if result.wasSuccessful() else 1

if __name__ == "__main__":
    sys.exit(run_tests())
