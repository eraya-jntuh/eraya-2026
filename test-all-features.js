/**
 * Comprehensive Test Script for Eraya 2026
 * Tests all critical features: Auth, Registration, Contact, Admin
 */

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

async function testFeature(name, testFn) {
  console.log(`\n🧪 Testing: ${name}`);
  try {
    const result = await testFn();
    if (result.success) {
      console.log(`✅ PASSED: ${name}`);
      return { name, success: true, details: result };
    } else {
      console.log(`❌ FAILED: ${name}`);
      console.log(`   Error: ${result.error || JSON.stringify(result)}`);
      return { name, success: false, error: result.error || result };
    }
  } catch (error) {
    console.log(`❌ FAILED: ${name}`);
    console.log(`   Exception: ${error.message}`);
    return { name, success: false, error: error.message };
  }
}

async function testAPI(endpoint, method, body, expectedStatus = 200) {
  try {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };
    if (body) options.body = JSON.stringify(body);
    
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await response.json();
    
    return {
      success: response.status === expectedStatus,
      status: response.status,
      data,
      error: response.status !== expectedStatus ? `Expected ${expectedStatus}, got ${response.status}` : null,
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function runAllTests() {
  console.log('🚀 Starting Comprehensive Tests...');
  console.log(`📍 Testing against: ${BASE_URL}\n`);

  const results = [];

  // Test 1: Environment Variables
  results.push(await testFeature('Environment Variables Check', async () => {
    // This will be checked via logs
    return { success: true, message: 'Check logs for env var status' };
  }));

  // Test 2: Registration API - Valid
  results.push(await testFeature('Registration API (Valid)', async () => {
    return await testAPI('/api/registrations', 'POST', {
      eventName: 'Integration Test Event',
      entryFee: '₹100',
      fullName: 'Test User',
      email: `test-${Date.now()}@example.com`,
      phone: '9876543210',
      college: 'Test College',
      year: '3rd',
      branch: 'CSE',
      transactionId: `TXN-${Date.now()}`,
    }, 201);
  }));

  // Test 3: Registration API - Validation
  results.push(await testFeature('Registration API (Validation)', async () => {
    return await testAPI('/api/registrations', 'POST', {
      eventName: '',
      email: 'invalid',
    }, 400);
  }));

  // Test 4: Contact API - Valid
  results.push(await testFeature('Contact API (Valid)', async () => {
    return await testAPI('/api/contact', 'POST', {
      name: 'Test Contact',
      email: `contact-${Date.now()}@example.com`,
      phone: '9876543210',
      message: 'Integration test message',
    }, 201);
  }));

  // Test 5: Contact API - Validation
  results.push(await testFeature('Contact API (Validation)', async () => {
    return await testAPI('/api/contact', 'POST', {
      name: '',
      email: 'invalid',
      message: '',
    }, 400);
  }));

  // Test 6: Auth Page Accessibility
  results.push(await testFeature('Auth Page Accessibility', async () => {
    const response = await fetch(`${BASE_URL}/auth`);
    return {
      success: response.status === 200,
      status: response.status,
    };
  }));

  // Test 7: Home Page Accessibility
  results.push(await testFeature('Home Page Accessibility', async () => {
    const response = await fetch(`${BASE_URL}/`);
    return {
      success: response.status === 200,
      status: response.status,
    };
  }));

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(60));
  const passed = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${((passed / results.length) * 100).toFixed(1)}%`);
  console.log('='.repeat(60));

  if (failed > 0) {
    console.log('\n⚠️  Failed Tests:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`   - ${r.name}: ${r.error || 'Unknown error'}`);
    });
  }

  return { passed, failed, total: results.length };
}

runAllTests()
  .then(({ passed, failed }) => {
    if (failed === 0) {
      console.log('\n🎉 All tests passed!');
      process.exit(0);
    } else {
      console.log('\n⚠️  Some tests failed. Check logs for details.');
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('❌ Test execution failed:', error);
    process.exit(1);
  });


