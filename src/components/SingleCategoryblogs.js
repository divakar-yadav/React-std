import React from 'react';
import Searchbox from '../components/Searchbox';
import { withRouter } from 'react-router-dom'

class SingleCategoryblogs extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [{ Title: "CONTROL AND AUTOMATION ENGINEERING", Content: "The Control and Automation Engineering course at the FEDERAL UNIVERSITY OF MINAS GERAIS, also called CONTROL AND AUTOMATION ENGINEERING, is a course in the area of ​​Engineering, ..." },
            { Title: "ANALYSIS AND SYSTEMS DEVELOPMENT", Content: "The FIEO UNIVERSITY CENTER course, also called ANALYSIS AND SYSTEM DEVELOPMENT, is a course in the area of ​​Science, Mathematics and ..." },
            { Title: "MEDICINE", Content: "The Medicine course of the UNIVERSIDADE ESTADUAL DO PIAUÍ, also called MEDICINA, is a course in the area of ​​Health and social well-being, located on the campus of the city of TERESINA, in..." }],
            notInHomeThree: true,
            searchDropDown: true,
            issearchdropdownVisible: true,
            textvisible: false,
            singleCatBlogs: []
        }
    }
    componentDidMount = () => {
        console.log("cat_id", this.props.match.params.cat_id)
        fetch('https://www.clixtest.cf/blog?Categories._id=' + this.props.match.params.cat_id)
            .then(response => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(data => {
                console.log("single cat blogs---->>>>", JSON.stringify(data))
                this.setState({ singleCatBlogs: data })
            });
    }
    handleSingleBlog = (e) => {
        console.log("element", e.currentTarget.getAttribute('data-value'))
        var blog_id = e.currentTarget.getAttribute('data-value')
        console.log("blog_id", blog_id)
        this.props.history.push('/single-blog/' + blog_id)
        console.log("handleSingleBlog is called");
    }

    showDropdown = () => {
        this.setState({ searchDropDown: true })
    }
    hideDropdown = () => {
        this.setState({ searchDropDown: false })
    }
    handleBlog = () => {
        console.log("handlecourse is called")
        this.props.history.push('/blog-post')

    }

    handleContactUs = () => {
        this.props.history.push('/contact-us')

    }


    render() {
        console.log("fdfd")
        if (this.state.singleCatBlogs.length != 0) {
            let DataList = this.state.singleCatBlogs.map((val, i) => {
                return (
                    <div key={i} className="col-lg-4 col-md-12 col-sm-12">
                        <div className="card" style={{ margin: '0.5rem' }} id="demo" data-value={val._id} onClick={this.handleSingleBlog}>
                            <div className="img-data">
                                <img className="card-img-top" src="assets/images/feature2.png" alt="Card image cap" />
                                <div className="top-lft-txt">
                                    <span>Blog-do-vs</span>
                                </div>
                                <div className="clicks-data">
                                    <a href="#" class="link1"><i class="fa fa-heart" aria-hidden="true"></i>Favourite</a>
                                </div>
                                <div className="clicks-data2">
                                    <a href="#" class="link2"><i class="fa fa-eye" aria-hidden="true"></i>Preview</a>
                                </div>
                            </div>
                            <div className="card-body">
                                <a href="#" className="card-title">{val.Title}</a>
                                <ul class="book-links">
                                    <li><i class="fa fa-bookmark" aria-hidden="true"></i>Engineering</li>
                                    <li><i class="fa fa-map-marker" aria-hidden="true"></i>
                                        BELO HORIZONTE</li>
                                </ul>
                                <hr />
                                <p className="card-text">{val.Text}</p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                </small>
                            </div>
                        </div>
                    </div>
                );
            });
            return (<div onClick={this.hideDropdown}>
                <div className="navbar">
                    <div class="nav-title">
                        <img src={"https://2n6nxy34fo7t3i43ol234qil-wpengine.netdna-ssl.com/wp-content/uploads/2018/05/logo_stoodi_carreiras_141x48.png"} />
                    </div>
                    <div className="searchbox-wrapper"><Searchbox
                        textvisible={this.state.textvisible}
                        searchDropDown={this.state.searchDropDown}
                        notInHomeThree={this.state.notInHomeThree}
                        showDropdown={this.showDropdown}
                        issearchdropdownVisible={this.state.issearchdropdownVisible}
                        courses_searchbox={this.state.courses_searchbox}
                        textvisible={this.state.textvisible} /></div>
                    <div className="form-inline my-2 my-lg-0"></div>
                    <div className="nav-items">
                        <ul>
                            <li onClick={this.handleCourse}><a>Courses</a></li>
                            <li onClick={this.handleBlog}><a>Blog</a></li>
                            <li><a href="https://stoodi.zendesk.com/hc/pt-br/requests/new">Contact us</a></li>
                            <li><i class="fa fa-user-o" aria-hidden="true"></i></li>
                        </ul>
                    </div>
                </div>
                <section id="blog" className="blog">
                    <div className="about-decor">
                        <div className="about-circle1"><img src="assets/images/team1.png" alt="" /></div>
                        <div className="about-circle2"><img src="assets/images/main-banner1.png" alt="" /></div>
                    </div>
                    <div className="content-sec container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="top-contentt">
                                    <h2 className="title"><span>The best tips for your career!</span></h2>
                                    <span>Decouple your career with our tips!</span>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="card-group">
                                    <div className="row">
                                        {DataList}
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="card-group">
                                    <div className="row">
                                        {DataList}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
            );

        }
        else {
            return (
                <div>
                    <div onClick={this.hideDropdown}>
                        <div className="navbar">
                            <div class="nav-title">
                                <img src={"https://2n6nxy34fo7t3i43ol234qil-wpengine.netdna-ssl.com/wp-content/uploads/2018/05/logo_stoodi_carreiras_141x48.png"} />
                            </div>
                            <div className="searchbox-wrapper"><Searchbox
                                textvisible={this.state.textvisible}
                                searchDropDown={this.state.searchDropDown}
                                notInHomeThree={this.state.notInHomeThree}
                                showDropdown={this.showDropdown}
                                issearchdropdownVisible={this.state.issearchdropdownVisible}
                                courses_searchbox={this.state.courses_searchbox}
                                textvisible={this.state.textvisible} /></div>
                            <div className="form-inline my-2 my-lg-0"></div>
                            <div className="nav-items">
                                <ul>
                                    <li onClick={this.handleCourse}><a>Courses</a></li>
                                    <li onClick={this.handleBlog}><a>Blog</a></li>
                                    <li><a href="https://stoodi.zendesk.com/hc/pt-br/requests/new">Contact us</a></li>
                                    <li><i class="fa fa-user-o" aria-hidden="true"></i></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className="No-data" ><p> No data in this category</p></div>
                </div>

            )
        }





    }
}


export default withRouter(SingleCategoryblogs);