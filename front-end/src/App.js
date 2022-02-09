import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";
import Protected from "./Protected";
import ProductList from "./ProductList";
import SingleProduct from "./SingleProduct";
import SearchProduct from "./SearchProduct";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route element={<Protected Cmp={AddProduct}/>}>
                        <Route path="/add" element={<AddProduct/>}>
                        </Route>
                    </Route>

                    <Route element={<Protected Cmp={UpdateProduct}/>}>
                        <Route path="/update/:id" element={<UpdateProduct/>}>
                        </Route>
                    </Route>
                    <Route element={<Protected Cmp={SingleProduct}/>}>
                        <Route path="/singleProduct" element={<SingleProduct/>}>
                        </Route>
                    </Route>
                    <Route element={<Protected Cmp={SearchProduct}/>}>
                        <Route path="/search" element={<SearchProduct/>}>
                        </Route>
                    </Route>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route element={<Protected Cmp={ProductList}/>}>
                        <Route path="/" element={<ProductList/>}>
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
