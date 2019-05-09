import React, {Component} from 'react';


import logo from './images/logo.jpeg';
import right1 from './images/top-right-1.jpg';
import right2 from './images/top-right-2.jpg';
import right3 from './images/top-right-3.jpg';
import signup from './signup'

class App extends Component{
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
      
        
    }

    callAPI() {
        fetch('http://localhost:5000/testAPI')
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }));
    }

    componentWillMount() {
        this.callAPI();
    }
  

    render() {
        return (
            <React.Fragment>    
                <header id="home">
                
                    {/* <!-- navbar start--> */}
                    <nav className="navbar navbar-expand-sm fixed-top shadow navbar-light bg-white">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#"><img src={logo} width="40" height="40" alt="" /></a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navBarCollapse" aria-controls="navBarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            {/* <!--Navbar collapse--> */}
                            <div id="navBarCollapse" className="collapse navbar-collapse">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <a className="nav-link" href="#home">Home</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">About Us</a>
                                    </li>
                                    <li className="nav-item">    
                                    <BrowserRouter>
                                        <Link to={"/signup"} className="nav-link" >Sign Up</Link>
                                    </BrowserRouter>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Sign In</a>
                                    </li>
                                </ul>
                            </div>
                            {/* <!--/Navbar collapse--> */}
                        </div>
                    </nav>
                    {/* <!-- /navbar end-->  */}
                </header>

                {/* //  home-page */}
                <section className="home-page py-6">
                    <div className="home-inner">
                        <div className="container py-6 py-md-7 text-white">
                            <div className="row">
                                <div className="col-xl-10">
                                    <div className="caption text-center text-xl-left">
                                        <p className="subtitle letter-spacing-4 mb-2 text-shadow">THE BEST RESTAURSNT EXPERIENCE</p>
                                        <h1 className="display-3 font-weight-bold text-shadow">Discover and Book</h1>
                                    </div>
                                    <div className="search-bar mt-5 p-3 p-xl-1 pl-xl-4">
                                        <form action="#">
                                            <div className="row ">
                                                <div className="col-xl-7 d-flex align-items-center form-group divider">
                                                    <input type="text" name="search" placeholder="What are you searching for?" className="form-control border-0" />
                                                </div>
                                                <div className=" col-xl-3  5mb-5d-flex align-items-center form-group d-flex">
                                                    <input type="text" name="location" placeholder="Location" id="location" className="form-control border-0" />
                                                    <a href="" ><i className="far fa-compass"></i></a>
                                                </div>
                                                <div className="col-xl-2 d-flex align-items-center ">
                                                    <button type="submit" className="btn btn-primary btn-block rounded-xl h-100 ">Search </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* // Feature section start */}
                <section className="feature bg-light">
                    <div className="container">
                        <div className="text-center pb-5 ">
                            <h2>{this.state.apiResponse}</h2>
                        </div>
                        <div className="row">
                            <div className="col-xl-4 mb-4">
                                <div className="px-3 text-center">
                                    <div className="svg pb-3">
                                        <i className="fab fa-react display-3"></i>
                                    </div>
                                    <h3>REACT Framework</h3>
                                    <p className="TestAPI">{this.state.apiResponse}</p>
                                    <p className="text-muted">React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes</p>
                                </div>
                            </div>
                            <div className="col-xl-4 mb-4">
                                <div className="px-3 text-center">
                                    <div className="svg pb-3">
                                        <i className="fab fa-react display-3"></i>
                                    </div>
                                    <h3>REACT Framework</h3>
                                    <p className="text-muted">React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes</p>
                                </div>
                            </div>
                            <div className="col-xl-4 mb-4">
                                <div className="px-3 text-center">
                                    <div className="svg pb-3">
                                        <i className="fab fa-react display-3"></i>
                                    </div>
                                    <h3>REACT Framework</h3>
                                    <p className="text-muted">React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* // Popular restaurant start */}
                <section className="recommend pt-6 bg-white">
                    <div className="container">
                        <div className="row mb-5">
                            <div className="col-md-8">
                                <p className="subtitle letter-spacing-4 mb-2 text-shadow">EAT LIKE A LOCAL</p>
                                <h2>Popular Restarants</h2>
                            </div>
                            <div className="col-md-4 d-flex justify-content-end">
                                <a href="#" className="text-muted text-sm">See all guides<i className="fas fa-angle-double-right ml-2"></i></a></div>
                        </div>
                        <div className="row">
                            <div className=" col-xl-3 col-lg-6 col-md-12 mb-5 ">
                                <div className="card">
                                    <img src={right1} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">Martini Ristorante</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="#" className="btn btn-primary">Booking</a>
                                    </div>
                                </div>
                            </div>
                            <div className=" col-xl-3 col-lg-6 col-md-12 mb-5 ">
                                <div className="card">
                                    <img src={right3} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">Gaucho's</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="#" className="btn btn-primary">Booking</a>
                                    </div>
                                </div>
                            </div>
                            <div className=" col-xl-3 col-lg-6 col-md-12 mb-5 ">
                                <div className="card">
                                    <img src={right2} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">Godi La Vita</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="#" className="btn btn-primary">Booking</a>
                                    </div>
                                </div>
                            </div>
                            <div className=" col-xl-3 col-lg-6 col-md-12 mb-5 ">
                                <div className="card">
                                    <img src={right3} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">Gaucho's</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="#" className="btn btn-primary">Booking</a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                {/* // Join Us start */}
                <section className="member">
                    <div className="content container">
                        <div className="overlay-content text-white">
                            <h3 className="display-3 font-weight-bold text-shadow mb-5">Ready to Become a Member?</h3>
                            <a href="" className="btn btn-outline-light btn-lg">Get Started</a>
                        </div>
                    </div>
                </section>
                {/* //footer */}
                <footer>
                    <div className="row justify-content-center">
                        <div className="col-md-5 text-center">
                        </div>
                    </div>
                </footer>

            </React.Fragment>
        );
        
    }
 
}



export default App;
