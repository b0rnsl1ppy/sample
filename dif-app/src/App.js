// useState hook - let state/value changes reflect in DOM. Imported from React. 
// Creates data that can be changed without leaving the page.

// useEffect hook - auto-compile and display state/value changes to DOM. Imported from React.
// Registers code that runs when a state changes.
import { useState, useEffect } from "react"

// To use Loading.js component
import Loading from './Loading'

// To use Profile.js component
import Profile from './Profile'

// export default to resolve error "export 'default' (imported as 'App') was not found in './App' (module has no exports)"
function App() {

  // state value to hold data once fetched from API
  // data comes from setItems() func
  const [items, setItems] = useState([])

  // state value to fetch data using username
  // keep *blank* to access random public users
  const [users] = useState("florinpop17")

  // useEffect hook with empty arrayso hook only runs on initial render of app component
  useEffect(() => {

    // send get/fetch request to github API
    const fetchRep = async () => {

      try {
        // wait for +ve cofirmation of data fetch from URL, store in response
        // will run everytime ${} state value changes
        // 'repos' not included after '/' to fix TypeError: items.map is not a function
        const res = await fetch(`https://api.github.com/users/${users}/repos?page=1&per_page=6&sort=updated`)

        // wait for +ve cofirmation of parsing of fetched data to json format
        const data = await res.json()

        // Set json formatted data in setItems
        // To populate items state value
        setItems(data)

      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchRep()
  }, [users]) // Dependency array to run useEffect only on initial render, keep [] empty if want the effect to run only once on initial render

  // Content to display in DOM
  return <>

    {/* Check if items is array or not */}
    {Array.isArray(items) ? <> <h2>Array</h2> </> : <> <h2>Not array</h2> </>}

    {/* Check if items present else use loading component (Loading.js) */}
    {!items ? <Loading /> : (<>
      <section>
        <h1>Veiwing {users}'s profile </h1>

        <div>

          {/* 
        For every item return Profile component
        Every item will have unique key (must in React)
        id comes from the API
        then pass rest of items {...item} from API
      */}

          {/* Check if items array not empty */}
          {items.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (

                // Exported to props argument in Profile.js
                <Profile key={item.id} {...item} />
              ))}
            </div>
          ) : <p>No items to display</p>}

        </div>
      </section>
    </>)}
  </>
}

export default App