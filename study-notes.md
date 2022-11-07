# FULL STACK OPEN

Deep Dive Into Modern Web Development

https://fullstackopen.com/en/

## Part 7

### React-router

- Traditional web apps with multiple pages just make GET requests for the new page html
- With react, we *could* represent each page with a component, and conditionally check the state to see which page to display
	- each page doesn't have its own address, which makes bookmarking impossible

- install **react-router-dom**
  
		import {
  			BrowserRouter as Router, Routes, Route, Link
		} from "react-router-dom"

- the above imports components that then point to your 'view' components
- useParams() hook lets you access url parameters
	- for instance, each Blog in BlogsList component is pointed to by a Link with url `/blogs/:id`
- useNavigate() hook lets us move between routes (for example, when a user logs in with their credentials, they go back to home)
