// no-index-imports

import { isStringLiteral } from 'tsutils/index'
// import { isStringLiteral } from 'tsutils'
import '../haha/index'
// import '../haha'

// required-fields-first

interface Props {
  a?: string
  b: number
  c?: string
  /** Lol */
  d: number
}
/*
interface Props {
  b: number;
  // Lol
  d: number;
  a?: string;
  c?: string;
}
*/
