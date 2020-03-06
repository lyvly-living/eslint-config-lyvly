# Lyvly Javascript Style Guide

### Fork of https://github.com/airbnb/javascript

*An approach to JavaScript that mostly follows AirBnB's guidelines with some minor tweaks*

## Backend

### 1. Exporting functions

- Use only named exports.
```
    // Preferred 🚀
    // ------------
    export const myFunction = () => {}
    
    // Avoid 👎
    // --------
    const myFunction = () => {}
    export default myFunction
    
    // Avoid 👎
    // --------
    export default () => {}
```
- Relatedly: do not use index files. Always import directly from the relevant file.

**Why?**

- This ensures consistent naming across the codebase.
    - In comparison, if you use a default export then you can rename it on import.
- Also: it helps us write self-contained tests (see rule 4). You can use `jest.mock` on the entire module, and then modify its implementation on a test-by-test basis:
```
    // Preferred 🚀
    // ------------
    import { myFunction } from './myFunction'
    
    jest.mock('./myFunction')
    
    describe('myModule', () => {
    	it('does one thing', () => {
    		myFunction.mockReturnValue('foo')
    	})
    
    	it('does another thing', () => {
    		myFunction.mockReturnValue('bar')
    	})
    })
```
### 2. Writing related functions

- If you are writing several related functions (e.g. crud operations for an entity), put them in the same file.
- When you import those functions, use wildcard syntax:
```
    // Preferred 🚀
    // ------------
    import * as memberDomain from './memberDomain'
    
    memberDomain.create()
    memberDomain.update()
    
    // Avoid 👎
    // --------
    import { create, update } from './memberDomain'
    
    create()
    update()
```
- When naming functions, don't repeat yourself:
```
    // Preferred 🚀
    // ------------
    memberDomain.create()
    memberDomain.update()
    
    // Avoid 👎
    memberDomain.createMember()
    memberDomain.updateMember()
```
- If your test file is getting large, don't be afraid to have several smaller test files for one module.

**Why?**

- This helps distinguish between several similarly named functions. For example, we can tell that something like `memberDomain.create` will write to the database, while `memberApi.create` will call an api.

### 3. Writing individual helper functions

- If you are writing an individual helper function which isn't *obviously* related to other functions (e.g. `parseResponse` or `authenticate`), put it in its own file.
- However, these should still be exported using a named export, as per rule 1.
- Import these directly, instead of using wildcard syntax which is unnecessarily clunky:
```
    // Preferred 🚀
    // ------------
    import { parseResponse } from './parseResponse'
    parseResponse()
    
    // Avoid 👎
    // --------
    import * as parseResponse from './parseResponse'
    parseResponse.parseResponse()
```
- Keep these files as close as possible to the things that use them. This means we can easily move/delete the things that use them, without having to move/copy helper functions from lots of different places.
    - Relatedly: do not create a global `utils` folder except for truly global things.

### 4. Tests should be self-contained

- Each test should contain all of the code required to understand that test.
```
    // Preferred 🚀
    // ------------
    it('finds an existing member', () => {
    	// Seed the database
    	memberDomain.create({ firstName: 'Homer', lastName: 'Simpson' })
    
    	const member = memberDomain.find({ firstName: 'Homer' })
    	expect(member).toEqual({ firstName: 'Homer', lastName: 'Simpson' })
    })
    
    it('updates an existing member', () => {
    	// Seed the database
    	memberDomain.create({ firstName: 'Homer', lastName: 'Simpson' })
    
    	const member = memberDomain.update({ firstName: 'Homer' }, { firstName: 'Marge' })
    	expect(member).toEqual({ firstName: 'Marge', lastName: 'Simpson' })
    })
    
    
    // Avoid 👎
    // --------
    beforeEach(() => {
    	// Seed the database
    	memberDomain.create({ firstName: 'Homer', lastName: 'Simpson' })
    })
    
    it('finds an existing member', () => {
    	const member = memberDomain.find({ firstName: 'Homer' })
    	expect(member).toEqual({ firstName: 'Homer', lastName: 'Simpson' })
    })
    
    it('updates an existing member', () => {
    	const member = memberDomain.update({ firstName: 'Homer' }, { firstName: 'Marge' })
    	expect(member).toEqual({ firstName: 'Marge', lastName: 'Simpson' })
    })
```
- Additionally, tests should be independent. So you should make sure that each test is operating on a different entity in the database, or that you're wiping the data between each test.

**Why?**

- If a test breaks, then you can quickly understand what that test is doing — and hence what might be wrong.

Related to this:

### 5. Don't be afraid of duplicating code

**Why?**

- In a microservices / serverless world, we're duplicating a lot of code anyway.
- When modules and folders are self-contained, it's easier to move or delete them. It's way more painful if those modules / folders depend on shared helper functions which are used by other modules / folders.

**Rules of Thumb**

- Things that are generally good to duplicate: schemas, business logic.
- Things that are generally bad to duplicate: things which *should* be uniform, like logging.

## Frontend

The rules are the same as for the backend, except for the following exceptions:

### 1. Use default exports for React components

**Why?**

- This is common practice for React components.
- It also helps when testing components wrapped by higher-order components. If you use a default export for the wrapped component, and a named export for the base component, you can use the latter in your tests:
```
    // If your React component looks like this:
    export const Title = () => {
    	return (
    		<p>Lyvly</p>
    	)
    }
    
    export default compose(
    	inject('listingStore'),
    	observer
    )(Title)
    
    // Then your test can use the named export:
    import { Title } from './Title'
    
    describe('<Title />', () => {
    	it('matches snapshot', () => {
    		// No mocking of MobX required!
    		expect(Title).toMatchSnapshot()
    	})
    })
```
### 2. Use index files for React components

**Why?**

- Unlike the backend, there are several files associated with a component. Using an index file means that we can use a neater import whenever we use that component:
```
    // For a file structure that looks like this:
    // Title/
    // -- Title.js
    // -- Title.props.js
    // -- Title.style.js
    // -- Title.storybook.js
    // -- index.js
    
    // If we have an index file like this:
    import Title from './Title'
    export default Title
    
    // We can import the Title component like this:
    import Title from '@components/Title'
    
    // Rather than like this:
    import Title from '@components/Title/Title'
```