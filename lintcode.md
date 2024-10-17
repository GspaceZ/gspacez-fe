# Coding convention for JS & FrameworkJS

## Table of Contents

1. [JS coding conventions](#js-coding-conventions)
   1. [80 characters per line](#80-characters-per-line)
   2. [Use single quotes](#use-single-quotes)
   3. [Opening braces go on the same line](#opening-braces-go-on-the-same-line)
   4. [Use lowerCamelCase for variables, properties and function names](#use-lowercamelcase-for-variables-properties-and-function-names)
   5. [Use UpperCamelCase for class names, components](#use-uppercamelcase-for-class-names-components)
   6. [Use UPPERCASE for Constants](#use-uppercase-for-constants)
   7. [Use the === operator](#use-the--operator)
   8. [Use descriptive conditions](#use-descriptive-conditions)
   9. [Write small functions](#write-small-functions)
   10. [Return early from functions](#return-early-from-functions)
   11. [No nested closures](#no-nested-closures)
2. [TS coding conventions](#ts-coding-conventions)
   1. [Do not use null](#do-not-use-null)
   2. [Do not use any](#do-not-use-any)
   3. [Filename](#filename)

## JS coding conventions

#### 80 characters per line

Limit your lines to 80 characters. Yes, screens have gotten much bigger over the
last few years, but your brain has not. Use the additional room for split screen,
your editor supports that, right?

#### Use single quotes

Use single quotes, unless you are writing JSON.

✅ Do

```ts
let foo = 'bar'
```

❌ Don't

```ts
let foo = 'bar'
```

#### Opening braces go on the same line

Your opening braces go on the same line as the statement.

✅ Do

```ts
if (true) {
  console.log('winning')
}
```

❌ Don't

```ts
if (true) {
  console.log('losing')
}
```

Also, notice the use of whitespace before and after the condition statement.

#### Use lowerCamelCase for variables, properties and function names

Variables, properties and function names should use `lowerCamelCase`. They
should also be descriptive. Single character variables and uncommon
abbreviations should generally be avoided.

✅ Do

```ts
let adminUser = ''
function barFunc() {}
```

❌ Don't

```ts
let admin_user = ''
function bar_func() {}
function BarFunc() {}
```

#### Use UpperCamelCase for class names, components

Class names should be capitalized using `UpperCamelCase`.

✅ Do

```ts
const BankAccount = ()=> {};
class BankAccount = {}
```

❌ Don't

```ts
const bankAccount = ()=> {};
class Bank_Account = {}
```

#### Use UPPERCASE for Constants

Constants should be declared as regular variables or static class properties, using all uppercase letters. Use `const` to create variable

✅ Do

```ts
const SECOND = 1 * 1000;

let File = {};
File.FULL_PERMISSIONS = 0777;
```

❌ Don't

```ts
const second = 1 * 1000;

let File = {};
File.fullPermissions = 0777;
```

#### Use the === operator

Programming is not about remembering [stupid rules][comparisonoperators]. Use
the triple equality operator as it will work just as expected.

✅ Do

```ts
if (a !== '') {
}
```

❌ Don't

```ts
if (a != '') {
}
```

#### Use descriptive conditions

Any non-trivial conditions should be assigned to a descriptively named variable or function:

✅ Do

```ts
var isValidPassword = password.length >= 4 && /^(?=.*\d).{4,}$/.test(password)

if (isValidPassword) {
  console.log('winning')
}
```

❌ Don't

```ts
if (password.length >= 4 && /^(?=.*\d).{4,}$/.test(password)) {
  console.log('losing')
}
```

#### Write small functions

Keep your functions short. A good function fits on a slide that the people in the last row of a big room can comfortably read. So don't count on them having perfect vision and limit yourself to ~15 lines of code per function.

#### Return early from functions

To avoid deep nesting of if-statements, always return a function's value as early
as possible.

✅ Do

```ts
function isPercentage(val) {
  if (val < 0) {
    return false
  }

  if (val > 100) {
    return false
  }

  return true
}
```

❌ Don't

```ts
function isPercentage(val) {
  if (val >= 0) {
    if (val < 100) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}
```

Or for this particular example it may also be fine to shorten things even
further:

```ts
function isPercentage(val) {
  var isInRange = val >= 0 && val <= 100
  return isInRange
}
```

#### No nested closures

Use closures, but don't nest them. Otherwise your code will become a mess.

✅ Do

```ts
setTimeout(function () {
  client.connect(afterConnect)
}, 1000)

function afterConnect() {
  console.log('winning')
}
```

❌ Don't

```ts
setTimeout(function () {
  client.connect(function () {
    console.log('losing')
  })
}, 1000)
```

## TS coding conventions

#### Do not use null

Use `undefined`. Do not use `null` except where external libraries require it.

✅ Do

```ts
let userType = undefined
```

❌ Don't

```ts
let userType = null
```

#### Do not use any

Do not use `any` anywhere in the code.

✅ Do

```ts
type Result = 'success' | 'failure'
function verifyResult(result: Result) {
  if (result === 'success') {
    console.log('Passed')
  } else {
    console.log('Failed')
  }
}
```

❌ Don't

```ts
function verifyResult(result: any) {
  if (result === 'success') {
    console.log('Passed')
  } else {
    console.log('Failed')
  }
}
```

#### Filename

Name files with `camelCase`. E.g. `utils.ts`, `map.ts` etc.

✅ Do

```ts
getUser.ts
```

❌ Don't

```ts
getuser.ts
get - user.ts
get_user.ts
GetUser.ts
Get_User.ts
```
