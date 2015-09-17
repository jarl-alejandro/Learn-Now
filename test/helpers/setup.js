'use strict'
/**
 * Assertion and testing utilities
 */

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised);

GLOBAL.AssertionError = chai.AssertionError;
GLOBAL.expect = chai.expect;