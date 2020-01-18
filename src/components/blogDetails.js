import React, { Component } from 'react'

export default class blogDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notInHomeThree: true,
        }
    }
    render() {
        return (
            <div>
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
                            <li onClick={this.handleContactUs}><a>Contact us</a></li>
                            <li><i class="fa fa-user-o" aria-hidden="true"></i></li>
                        </ul>
                    </div>
                </div>
                <h1>blog detail</h1>
            </div>
        )
    }
}
