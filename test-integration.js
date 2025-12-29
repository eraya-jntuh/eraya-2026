/**
 * Integration Test Script for Eraya 2026 Frontend-Backend
 * Tests API endpoints, database connectivity, and data flow
 */

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

async function testAPIEndpoint(endpoint, method, body, expectedStatus = 200) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await response.json();
    
    return {
      success: response.status === expectedStatus,
      status: response.status,
      data,
      error: response.status !== expectedStatus ? `Expected ${expectedStatus}, got ${response.status}` : null,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

async function runTests() {
  console.log('🧪 Starting Integration Tests...\n');
  console.log(`📍 Testing against: ${BASE_URL}\n`);

  const results = {
    passed: 0,
    failed: 0,
    tests: [],
  };

  // Test 1: Registration API - Valid Data
  console.log('Test 1: Registration API (Valid Data)');
  const test1 = await testAPIEndpoint('/api/registrations', 'POST', {
    eventName: 'Test Event',
    entryFee: '₹100',
    fullName: 'Test User',
    email: `test-${Date.now()}@example.com`,
    phone: '9876543210',
    college: 'Test College',
    year: '3rd',
    branch: 'CSE',
    transactionId: `TXN-${Date.now()}`,
  }, 201);
  
  results.tests.push({ name: 'Registration API (Valid)', ...test1 });
  if (test1.success) {
    console.log('✅ PASSED\n');
    results.passed++;
  } else {
    console.log(`❌ FAILED: ${test1.error || JSON.stringify(test1.data)}\n`);
    results.failed++;
  }

  // Test 2: Registration API - Invalid Data (Validation)
  console.log('Test 2: Registration API (Invalid Data - Validation)');
  const test2 = await testAPIEndpoint('/api/registrations', 'POST', {
    eventName: '',
    email: 'invalid-email',
  }, 400);
  
  results.tests.push({ name: 'Registration API (Validation)', ...test2 });
  if (test2.success) {
    console.log('✅ PASSED\n');
    results.passed++;
  } else {
    console.log(`❌ FAILED: ${test2.error || JSON.stringify(test2.data)}\n`);
    results.failed++;
  }

  // Test 3: Contact API - Valid Data
  console.log('Test 3: Contact API (Valid Data)');
  const test3 = await testAPIEndpoint('/api/contact', 'POST', {
    name: 'Test Contact',
    email: `contact-${Date.now()}@example.com`,
    phone: '9876543210',
    message: 'This is a test message for integration testing.',
  }, 201);
  
  results.tests.push({ name: 'Contact API (Valid)', ...test3 });
  if (test3.success) {
    console.log('✅ PASSED\n');
    results.passed++;
  } else {
    console.log(`❌ FAILED: ${test3.error || JSON.stringify(test3.data)}\n`);
    results.failed++;
  }

  // Test 4: Contact API - Invalid Data (Validation)
  console.log('Test 4: Contact API (Invalid Data - Validation)');
  const test4 = await testAPIEndpoint('/api/contact', 'POST', {
    name: '',
    email: 'invalid',
    message: '',
  }, 400);
  
  results.tests.push({ name: 'Contact API (Validation)', ...test4 });
  if (test4.success) {
    console.log('✅ PASSED\n');
    results.passed++;
  } else {
    console.log(`❌ FAILED: ${test4.error || JSON.stringify(test4.data)}\n`);
    results.failed++;
  }

  // Test 5: Duplicate Registration (Should fail with 409)
  console.log('Test 5: Duplicate Registration (Conflict)');
  const duplicateEmail = `duplicate-${Date.now()}@example.com`;
  await testAPIEndpoint('/api/registrations', 'POST', {
    eventName: 'Test Event',
    fullName: 'Test User',
    email: duplicateEmail,
    phone: '9876543210',
    college: 'Test College',
    year: '3rd',
    branch: 'CSE',
    transactionId: `TXN-${Date.now()}`,
  }, 201);
  
  // Try to register again with same email and event
  const test5 = await testAPIEndpoint('/api/registrations', 'POST', {
    eventName: 'Test Event',
    fullName: 'Test User 2',
    email: duplicateEmail,
    phone: '9876543210',
    college: 'Test College',
    year: '3rd',
    branch: 'CSE',
    transactionId: `TXN-${Date.now()}-2`,
  }, 409);
  
  results.tests.push({ name: 'Duplicate Registration', ...test5 });
  if (test5.success) {
    console.log('✅ PASSED\n');
    results.passed++;
  } else {
    console.log(`❌ FAILED: ${test5.error || JSON.stringify(test5.data)}\n`);
    results.failed++;
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(50));
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`📈 Success Rate: ${((results.passed / (results.passed + results.failed)) * 100).toFixed(1)}%`);
  console.log('='.repeat(50));

  if (results.failed === 0) {
    console.log('\n🎉 All integration tests passed! Frontend and backend are properly integrated.');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some tests failed. Please review the errors above.');
    process.exit(1);
  }
}

// Run tests
runTests().catch((error) => {
  console.error('❌ Test execution failed:', error);
  process.exit(1);
});


