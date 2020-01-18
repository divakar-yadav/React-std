import React from 'react';
import { SSL_OP_SINGLE_DH_USE } from 'constants';
import { withRouter } from 'react-router-dom'


class Searchbox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Course: "",
            SearchText: '',
            issearchdropdownVisible: false,
            courseAndCategories: "",
            Categories: [],
            filteredCategories: "",
            userDetail: ""

        }
    }


    handleOnClickCategory = (e) => {
        var Course_category_id = e.currentTarget.dataset.id
        this.props.history.push(`/course/` + Course_category_id);
        console.log("this.props.history------>", this.props.history)
    }

    handleOnClickCourses = (e) => {
        var Course_id = e.currentTarget.dataset.id
        this.props.history.push({
            pathname: `/course-detail/` + Course_id,
            userDetail: { userDetail: this.props.userDetail }
        })

    }

    componentDidMount() {
        fetch('https://www.clixtest.cf/category')
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then((data) => {
                this.setState({ Categories: data });
                // console.log("all course data", JSON.stringify(data))
            });

    }

    handlesearchdropdownvisibility = () => {

        this.setState({ issearchdropdownVisible: true })
    }


    handleSearchText = (e) => {
        // debugger
        this.setState({ SearchText: e.target.value })
        // hitting the course api
        var concated_url = 'https://www.clixtest.cf/course?Title_contains=' + e.target.value
        fetch(concated_url)
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then((data) => {
                this.setState({ Course: data });
                // console.log("course filtered data", JSON.stringify(data))
            });

        // hitting the category api
        var concated_url_category = 'https://www.clixtest.cf/category?Name_contains=' + e.target.value
        fetch(concated_url_category)
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then((data) => {
                this.setState({ filteredCategories: data });
                console.log("category filtered data", JSON.stringify(data))
            });
        // concating the responses of both api
        let mutablecopy_Course = this.state.Course.slice(0)
        let mutablecopy_Categories = this.state.filteredCategories.slice(0)
        var courseAndCategories = mutablecopy_Course.concat(mutablecopy_Categories)
        // console.log("mutablecopy", courseAndCategories)
        this.setState({ courseAndCategories: courseAndCategories })
    }


    childClickEvent = (e) => {
        e.stopPropagation()
        this.props.showDropdown()
    }


    render() {
        console.log("userDetailin searchbox", this.props.userDetail)
        const divStyle = {

            border: '1px solid #fff',
            borderRadius: '0px!important',
            height: '38px'
        };
        const buttonStyle = {
            paddingTop: '5px',
            paddingBottom: '5px'
        }
        const inputStyle = {
            fontSize: '12px',
            width: '450px'
        }





        return <div className="search-box-data" onClick={this.childClickEvent} >

            <div className="input-group mb-3" style={this.props.notInHomeThree === true ? divStyle : null} onClick={this.handlesearchdropdownvisibility} >
                <input type="text" style={this.props.notInHomeThree === true ? inputStyle : null} className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={this.handleSearchText} />
                <button style={this.props.notInHomeThree === true ? buttonStyle : null} type="button" className="btn search_buttn">Search</button>
            </div>
            {this.props.textvisible === false ? null : <span className="terms-sect">Enter the terms you are looking for</span>}
            {this.props.searchDropDown === true ? <div className="search-results" style={this.props.notInHomeThree === true ? { width: '77.2%', overflowX: 'hidden' } : null}>
                {this.state.courseAndCategories.length > 0 && this.state.SearchText.length > 0 ?
                    <div>

                        <div>
                            {this.state.issearchdropdownVisible === true ?
                                <div>
                                    <h5 className="Courses">Courses</h5>
                                    <ul className="search-data">
                                        {this.state.courseAndCategories.map((node, i) => {
                                            if (node.Title != null) {
                                                return (

                                                    <li className="datasets" key={i} data-id={node._id} onClick={this.handleOnClickCourses}>
                                                        <img className="course-image" src="assets/images/course-image.jpeg" />
                                                        <div className="text-spec">
                                                            <span className="course-tit">{node.Title}</span>
                                                            <span className="course-category">{node.category.Name}</span>
                                                            <span className="loc-spec">India</span>
                                                        </div>
                                                    </li>
                                                );
                                            }

                                        })}
                                    </ul>
                                </div>
                                : null}
                        </div>
                        <div>
                            {this.state.issearchdropdownVisible === true ?
                                <div className="categ-sec">
                                    <h5 className="Categories">Categories</h5>
                                    <ul className="search-data">
                                        {this.state.courseAndCategories.map((node, i) => {
                                            if (node.Name != null) {
                                                return (

                                                    <li className="datasets" key={i}
                                                        data-id={node._id}
                                                        onClick={this.handleOnClickCategory} >
                                                        {node.Name}
                                                    </li>
                                                );
                                            }

                                        })}
                                    </ul>
                                </div>
                                : null}
                        </div>



                    </div> :
                    <div>
                        {this.state.issearchdropdownVisible === true && this.state.Categories != null ?
                            <ul className="search-data">
                                {this.state.Categories.map((node, i) => {
                                    if (this.state.Categories != null) {
                                        return (
                                            <li className="datasets" key={i}
                                                data-id={node._id}
                                                onClick={this.handleOnClickCategory} >
                                                {node.Name}
                                            </li>
                                        );
                                    }

                                })}
                            </ul>
                            : null} </div>}

            </div> : null}

        </div >
    }
}

export default withRouter(Searchbox);