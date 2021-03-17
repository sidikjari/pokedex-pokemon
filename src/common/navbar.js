import { useHistory } from 'react-router-dom';
const Navbar = ({color}) => {
    const history = useHistory();
    const back = () => history.goBack();
    return(
        <nav style={{backgroundColor: color ? color : '#242424'}}>
            <div className="relative max-w-7xl px-2 lg:px-8 h-14 flex items-center justify-between">
                <div>
                    <h1 className={`text-white font-semibold text-lg ${color ? 'hidden' : null}`}>Pokédex</h1>
                    <h1 className={`text-white ${color ? 'pointer' : 'hidden'}`}>
                        <i onClick={back} className="fa fa-arrow-left" aria-hidden="true"></i>
                    </h1>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <div className="ml-3 relative">
                        <div className="relative text-gray-600 focus-within:text-gray-400">
                          <span className="absolute inset-y-0 right-0 flex items-center pl-2">
                            <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </button>
                          </span>
                          <input type="text" name="search" className="w-32 md:w-64 py-2 text-sm text-white rounded-md pl-1 pr-7 focus:outline-none focus:bg-white focus:text-gray-900" placeholder="Search..." autoComplete="off" />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;