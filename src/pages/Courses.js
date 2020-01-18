import React, { Component } from 'react';
import Searchbox from '../components/Searchbox';
import { withRouter } from 'react-router-dom'
class GridView extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    handleSingleCourseDetailCaller = () => {
        var course_id = this.props.node._id
        this.props.handleSingleCourseDetail(course_id)
    }
    render() {
        return (
            <div className="Course-Cards" onClick={this.handleSingleCourseDetailCaller}>
                <img className="bannerImage" src="https://udemy-images.udemy.com/course/240x135/1565838_e54e_6.jpg" />
                <div className="text">
                    <a className="courses-cards-title" >{this.props.node.Title}</a>
                    <div className="courses-cards-lable">
                        <div className="icon-wrapper"><i class="far fa-user"></i></div>
                        <div className="card-date"><i class="far fa-clock"></i><span className="date">{this.props.node.updatedAt}</span></div>
                    </div>
                    <div className="courses-cards-content">{this.props.node.Content}</div>

                </div>
            </div>

        )
    }
}
class ListView extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    handleSingleCourseDetailCaller = () => {
        var course_id = this.props.node._id
        this.props.handleSingleCourseDetail(course_id)
    }
    render() {
        return (
            <div class="card text-left" onClick={this.handleSingleCourseDetailCaller}>
                <div class="row ">
                    <div class="col-md-4">
                        <img src="https://udemy-images.udemy.com/course/240x135/1565838_e54e_6.jpg" class="w-100" />
                    </div>
                    <div class="col-md-8 px-3">
                        <div class="card-block px-3">
                            <h4 class="card-title">{this.props.node.Title}</h4>
                            <p class="card-text">Consectetur adipiscing elit, sed do eiusmod tempor iud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                            <p class="card-text"> id est laborum.</p>

                        </div>
                    </div>

                </div>
            </div>

        )
    }
}

class Courses extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filtered_Courses: [],
            textvisible: false,
            isGridViewVisible: true,
            category_filters: [],
            categories: [],
            location_filter: "",
            filtered_Courses_category_filterapplied: [],
            city: [],
            allCoursesVisible: false,
            courses_searchbox: true,
            issearchdropdownVisible: false,
            isCategoryFilterVisible: true,
            isLocationvisible: true,
            notInHomeThree: true,
            searchDropDown: true,
        }
    }





    handleAverageRating = () => {

    }
    handleTotalReview = () => {

    }
    handleMostPopular = () => {

    }
    handleCategoryfilterVisibility = () => {
        if (this.state.isCategoryFilterVisible === true) {
            this.setState({ isCategoryFilterVisible: false })
        }
        else {
            this.setState({ isCategoryFilterVisible: true })
        }
    }
    handleLocationFilterVisibility = () => {
        if (this.state.isLocationvisible === true) {
            this.setState({ isLocationvisible: false })
        }
        else {
            this.setState({ isLocationvisible: true })
        }
    }
    componentDidMount() {

        // comming through normal category selection
        fetch('https://www.clixtest.cf/course?category._id=' + this.props.match.params.id)
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then((data) => {
                this.setState({ filtered_Courses: data });
                var filtered_Courses = this.state.filtered_Courses.slice(0)
                console.log("filtered courses", filtered_Courses)
                filtered_Courses.sort(function (a, b) {
                    if (a.Title < b.Title) { return -1; }
                    if (a.Title > b.Title) { return 1; }
                    return 0;
                })
                this.setState({ filtered_Courses: filtered_Courses })
                console.log("filtered courses of this category", JSON.stringify(this.state.filtered_Courses))
            });

        // category_filters api
        fetch('https://www.clixtest.cf/category')
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then((data) => {

                this.setState({ categories: data });
                // console.log(" category filters", this.state.categories)
            })
        // .then(() => {
        //     var mutablecopy_categories = this.state.categories.slice(0)
        //     var copy_for_splice = mutablecopy_categories
        //     for (var i = 0; i < mutablecopy_categories.length; i++) {
        //         if (mutablecopy_categories[i]._id == this.props.match.params.id) {
        //             copy_for_splice.splice(i, 1)
        //         }
        //     }
        //     this.setState({ categories: copy_for_splice })
        // })

        // this is for location data

        fetch('https://www.clixtest.cf/city')
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then((data) => {
                this.setState({ city: data });
                // console.log("filtered courses of this category", JSON.stringify(this.state.filtered_Courses))
            });



    }

    handleLocationFilter = (value) => {
        // console.log("option value", value)
        var filtered_Courses = this.state.filtered_Courses.slice(0)
        const location_filtered_Courses = []
        for (var i = 0; i < filtered_Courses.length; i++) {
            if (filtered_Courses[i].university.city == value) {
                location_filtered_Courses.push(filtered_Courses[i])
            }
        }
        if (location_filtered_Courses.length > 0) {
            this.setState({ filtered_Courses: location_filtered_Courses })
            // alphabatical order
            var filtered_Courses = this.state.filtered_Courses.slice(0)
            console.log("filtered courses", filtered_Courses)
            filtered_Courses.sort(function (a, b) {
                if (a.Title < b.Title) { return -1; }
                if (a.Title > b.Title) { return 1; }
                return 0;
            })
            this.setState({ filtered_Courses: filtered_Courses })
        }


    }
    onChange = (e) => {
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.handleLocationFilter(value);
    }
    handleClearAll = () => {
        this.setState({ allCoursesVisible: true })
        fetch('https://www.clixtest.cf/course')
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then((data) => {
                this.setState({ filtered_Courses: data });
                console.log("filtered courses of this category", JSON.stringify(this.state.filtered_Courses))
                // alphabetical filter
                var filtered_Courses = this.state.filtered_Courses.slice(0)
                console.log("filtered courses", filtered_Courses)
                filtered_Courses.sort(function (a, b) {
                    if (a.Title < b.Title) { return -1; }
                    if (a.Title > b.Title) { return 1; }
                    return 0;
                })
                this.setState({ filtered_Courses: filtered_Courses })


            });

    }
    showDropdown = () => {
        this.setState({ searchDropDown: true })
    }
    hideDropdown = () => {
        this.setState({ searchDropDown: false })
    }

    // handleCourse = () => {
    //     console.log("handlecourse is called")
    //     fetch('https://www.clixtest.cf/course')
    //         .then((response) => {
    //             if (response.status >= 400) {
    //                 throw new Error("Bad response from server");
    //             }
    //             return response.json();
    //         })
    //         .then((data) => {
    //             this.setState({ filtered_Courses: data });
    //             //alphabatical order
    //             var filtered_Courses = this.state.filtered_Courses.slice(0)
    //             console.log("filtered courses", filtered_Courses)
    //             filtered_Courses.sort(function (a, b) {
    //                 if (a.Title < b.Title) { return -1; }
    //                 if (a.Title > b.Title) { return 1; }
    //                 return 0;
    //             })
    //             this.setState({ filtered_Courses: filtered_Courses })

    //         });
    // }

    handleBlog = () => {
        console.log("handlecourse is called")
        this.props.history.push('/blog-post')

    }

    handleContactUs = () => {
        this.props.history.push('/contact-us')

    }

    handleCategoryfilter = (e) => {

        // debugger
        var category_id = e.target.value
        console.log("category_id", category_id)

        fetch('https://www.clixtest.cf/course?category._id=' + category_id)
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then((data) => {
                this.setState({ filtered_Courses_category_filterapplied: data })


            })
            .then(() => {
                var existing_Courses = this.state.filtered_Courses.slice(0)
                var filtered_Courses = this.state.filtered_Courses_category_filterapplied.slice(0)

                console.log("existing courses", existing_Courses)
                console.log("filtered_Courses of a single category", filtered_Courses)
                var commonObjectsArray = []
                var copy_existing_courses = existing_Courses
                for (var i = 0; i < filtered_Courses.length; i++) {
                    for (var j = 0; j < existing_Courses.length; j++) {
                        if (filtered_Courses[i]._id == existing_Courses[j]._id) {
                            commonObjectsArray.push(filtered_Courses[i])
                            copy_existing_courses.splice(j, 1)
                        }
                    }
                }
                console.log("commonObjectsArray", commonObjectsArray)
                if (commonObjectsArray.length == 0) {
                    for (var i = 0; i < filtered_Courses.length; i++) {
                        existing_Courses.push(filtered_Courses[i])
                    }

                    console.log("concated array", existing_Courses)
                    this.setState({ filtered_Courses: existing_Courses })

                    //alphabatical order
                }
                else {
                    this.setState({ filtered_Courses: copy_existing_courses })
                    // alphabatical order
                    var filtered_Courses = this.state.filtered_Courses.slice(0)
                    console.log("filtered courses", filtered_Courses)
                    filtered_Courses.sort(function (a, b) {
                        if (a.Title < b.Title) { return -1; }
                        if (a.Title > b.Title) { return 1; }
                        return 0;
                    })
                    this.setState({ filtered_Courses: filtered_Courses })
                }

            })
    }

    handleFilters = (e) => {

        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        console.log("alphabetical filter", value)
        switch (value[0]) {
            case "Alphabetical":
                var filtered_Courses = this.state.filtered_Courses.slice(0)
                console.log("filtered courses", filtered_Courses)
                filtered_Courses.sort(function (a, b) {
                    if (a.Title < b.Title) { return -1; }
                    if (a.Title > b.Title) { return 1; }
                    return 0;
                })
                this.setState({ filtered_Courses: filtered_Courses })
                break;

            // case "rating":
            //     fetch('https://www.clixtest.cf/course?TopRated=true')
            //         .then((response) => {
            //             if (response.status >= 400) {
            //                 throw new Error("Bad response from server");
            //             }
            //             return response.json();
            //         })
            //         .then((data) => {
            //             this.setState({ filtered_Courses: data });
            //             //alphabatical order
            //             var filtered_Courses = this.state.filtered_Courses.slice(0)
            //             console.log("filtered courses", filtered_Courses)
            //             filtered_Courses.sort(function (a, b) {
            //                 if (a.Title < b.Title) { return -1; }
            //                 if (a.Title > b.Title) { return 1; }
            //                 return 0;
            //             })
            //             this.setState({ filtered_Courses: filtered_Courses })

            //         });
            //     break;

        }

    }
    viewCourseGrid = () => {
        this.setState({ isGridViewVisible: true })
    }
    viewCourseList = () => {
        this.setState({ isGridViewVisible: false })
    }

    handleSingleCourseDetail = (course_id) => {
        console.log("course_id", course_id)
        this.props.history.push(`/course-detail/` + course_id);
    }

    render() {

        if (this.state.filtered_Courses.length === 0)
            return <div className="outer-class" onClick={this.hideDropdown}>

                <div className="navbar">
                    <div class="nav-title">
                        <img src={"https://2n6nxy34fo7t3i43ol234qil-wpengine.netdna-ssl.com/wp-content/uploads/2018/05/logo_stoodi_carreiras_141x48.png"} />
                    </div>
                    <div className="searchbox-wrapper"><Searchbox
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
                <section className="card-sect">
                    <div className="container-sect-courses">
                        <div className="list-of-coursess">
                            <div className="row">
                                <div className="col-lg-3">
                                    <div className="side-bar-lists">
                                        <div className="loc-sect">
                                            <div className="hed-cont">
                                                <h3>LOCATION</h3>
                                                <span className="caret-iconn"><i onClick={this.handleLocationFilterVisibility}
                                                    class="fa fa-caret-down" aria-hidden="true"></i></span>
                                            </div>
                                            {this.state.isLocationvisible === true ? <select onChange={this.onChange}>
                                                {this.state.city.map((node, i) => {
                                                    return (
                                                        <option value={node._id} key={i}>{node.Name}</option>
                                                    )

                                                })}

                                            </select> : null}

                                        </div>
                                        <div className="loc-sect">
                                            <div className="hed-cont">
                                                <h3>CATEGORY</h3>
                                                <span className="caret-iconn"><i onClick={this.handleCategoryfilterVisibility} class="fa fa-caret-down" aria-hidden="true"></i></span>
                                            </div>
                                            {this.state.isCategoryFilterVisible === true ? <ul>
                                                {this.state.categories.map((node, i) => {
                                                    return (
                                                        <li key={i}>
                                                            <label class="chk">{node.Name}
                                                                <input type="checkbox" defaultChecked={this.props.match.params.id == node._id ? true : false} value={node._id} onChange={this.handleCategoryfilter} />
                                                                <span class="checkmark"></span>
                                                            </label>

                                                        </li>
                                                    )
                                                })}


                                            </ul> : null}

                                        </div>

                                    </div>

                                </div>
                                <div className="col-lg-9">
                                    <div className="course-filters">
                                        <div className="search-r">
                                            <span>{this.state.filtered_Courses.length} Courses</span>

                                        </div>
                                        <div className="view-sel">
                                            <div className="view-thumb">
                                                <i class="fa fa-th" aria-hidden="true" style={this.state.isGridViewVisible === true ? { color: "#16183f" } : null} onClick={this.viewCourseGrid}></i>
                                                <i class="fa fa-th-list" aria-hidden="true" style={this.state.isGridViewVisible === false ? { color: "#16183f" } : null} onClick={this.viewCourseList}></i>
                                            </div>
                                            <div className="view-sort">
                                                <select onChange={this.handleFilters}>
                                                    <option value="Alphabetical">Alphabetical Order</option>
                                                    <option value="rating">Average Ratings</option>
                                                    <option value="reviews">Total Reviews</option>
                                                    <option value="popular">More Popular</option>
                                                </select>
                                                <a href="#"><i class="fa fa-arrow-up" aria-hidden="true"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="no-courses"><span>No Courses Selected</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>;

        return (

            <div className="outer-class" onClick={this.hideDropdown}>

                <div className="navbar">
                    <div class="nav-title">
                        <img src={"https://2n6nxy34fo7t3i43ol234qil-wpengine.netdna-ssl.com/wp-content/uploads/2018/05/logo_stoodi_carreiras_141x48.png"} />
                    </div>
                    <div className="searchbox-wrapper"><Searchbox
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
                <section className="card-sect">
                    <div className="container-sect-courses">
                        <div className="list-of-coursess">
                            <div className="row">
                                <div className="col-lg-3">
                                    <div className="side-bar-lists">
                                        <div className="loc-sect">
                                            <div className="hed-cont">
                                                <h3>LOCATION</h3>
                                                <span className="caret-iconn"><i onClick={this.handleLocationFilterVisibility}
                                                    class="fa fa-caret-down" aria-hidden="true"></i></span>
                                            </div>
                                            {this.state.isLocationvisible === true ? <select onChange={this.onChange}>
                                                {this.state.city.map((node, i) => {
                                                    return (
                                                        <option value={node._id} key={i}>{node.Name}</option>
                                                    )

                                                })}

                                            </select> : null}

                                        </div>
                                        <div className="loc-sect">
                                            <div className="hed-cont">
                                                <h3>CATEGORY</h3>
                                                <span className="caret-iconn"><i onClick={this.handleCategoryfilterVisibility} class="fa fa-caret-down" aria-hidden="true"></i></span>
                                            </div>
                                            {this.state.isCategoryFilterVisible === true ? <ul>
                                                {this.state.categories.map((node, i) => {
                                                    return (
                                                        <li key={i}>
                                                            <label class="chk">{node.Name}
                                                                <input type="checkbox" defaultChecked={this.props.match.params.id == node._id ? true : false} value={node._id} onChange={this.handleCategoryfilter} />
                                                                <span class="checkmark"></span>
                                                            </label>

                                                        </li>
                                                    )
                                                })}


                                            </ul> : null}

                                        </div>

                                    </div>

                                </div>
                                <div className="col-lg-9">
                                    <div className="course-filters">
                                        <div className="search-r">
                                            <span>{this.state.filtered_Courses.length} Courses</span>

                                        </div>
                                        <div className="view-sel">
                                            <div className="view-thumb">
                                                <i class="fa fa-th" aria-hidden="true" style={this.state.isGridViewVisible === true ? { color: "#16183f" } : null} onClick={this.viewCourseGrid}></i>
                                                <i class="fa fa-th-list" aria-hidden="true" style={this.state.isGridViewVisible === false ? { color: "#16183f" } : null} onClick={this.viewCourseList}></i>
                                            </div>
                                            <div className="view-sort">
                                                <select onChange={this.handleFilters}>
                                                    <option value="Alphabetical">Alphabetical Order</option>
                                                    <option value="rating">Average Ratings</option>
                                                    <option value="reviews">Total Reviews</option>
                                                    <option value="popular">More Popular</option>
                                                </select>
                                                <a href="#"><i class="fa fa-arrow-up" aria-hidden="true"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                    {this.state.isGridViewVisible === true ? <div className="Courses-lists">

                                        {this.state.filtered_Courses.map((node, i) => {
                                            return (

                                                <GridView
                                                    node={node}
                                                    key={i}
                                                    handleSingleCourseDetail={this.handleSingleCourseDetail}
                                                />

                                            )
                                        })}
                                    </div> : <div className="list-view">
                                            {this.state.filtered_Courses.map((node, i) => {
                                                return (
                                                    <ListView
                                                        node={node}
                                                        key={i}
                                                        handleSingleCourseDetail={this.handleSingleCourseDetail}
                                                    />

                                                )
                                            })}
                                        </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default withRouter(Courses);