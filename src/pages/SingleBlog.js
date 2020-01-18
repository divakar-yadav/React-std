import React, { Component } from 'react';
import Searchbox from '../components/Searchbox';

class SingleBlog extends Component {
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
            blogCategories: [],
            recentPost: []

        }
    }


    componentDidMount() {

        //single blog data
        fetch('https://www.clixtest.cf/blog/' + this.props.match.params.blog_id)
            .then(response => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(data => {
                console.log(" single blog data---->>>>", JSON.stringify(data))
                this.setState({ data: data })
            });

        // category data
        fetch('https://www.clixtest.cf/blogcategory')
            .then(response => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(data => {
                console.log(" blog Category data---->>>>", JSON.stringify(data))
                this.setState({ blogCategories: data })
            });

        //  Recent Posts
        fetch('https://www.clixtest.cf/blog?_sort=createdAt:DESC')
            .then(response => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(data => {
                console.log(" recent blog data---->>>>", JSON.stringify(data))
                this.setState({ recentPost: data })
            });


        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2&appId=358051211692390&autoLogAppEvents=1';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

    }

    showDropdown = () => {
        this.setState({ searchDropDown: true })
    }
    hideDropdown = () => {
        this.setState({ searchDropDown: false })
    }
    handleCategory = (e) => {

        var blog_category_id = e.currentTarget.getAttribute('data-value')
        console.log("kdbhsjdhsk", blog_category_id)
        this.props.history.push('/single-cat-blog/' + blog_category_id)
        console.log("this.props.history", this.props.history)

    }

    handleRecentBlog = (e) => {

        var recent_blog_id = e.currentTarget.getAttribute('data-value')

        fetch('https://www.clixtest.cf/blog/' + recent_blog_id)
            .then(response => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(data => {
                console.log(" single blog data---->>>>", JSON.stringify(data))
                this.setState({ data: data })
            });

    }

    handleBlog = () => {
        console.log("handlecourse is called")
        this.props.history.push('/blog-post')

    }
    handleBlogComment = () => {
        var name = document.getElementById("exampleFormControlTextarea1").value
        var comment = document.getElementById("exampleFormControlInputText").value
        var email = document.getElementById("exampleFormControlInputEmail").value
        var site = document.getElementById("exampleFormControlInputSite").value
        var comment = {
            Name: name,
            Email: email,
            Url: site,
            Comment: comment
        }
        fetch('www.clixtest.cf/comment', {
            method: 'POST',
            body: comment
        })
            .then(response => response.json())
        console.log("comment data", comment)
    }
    render() {

        return (
            <div onClick={this.hideDropdown}>
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
                <section class="links-contt">
                    <div className="content-sec">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="top-contenttt">
                                    <h2 className="title"><span>Noun Bending - Questions</span></h2>
                                    <div className="links-bw">
                                        <nav aria-label="breadcrumb" class="blog-bradcrumb2 text-center">
                                            <ol class="breadcrumb bg-transparent mb-0">
                                                <li class="breadcrumb-item"><a href="http://localhost:3000">Home</a></li>
                                                <li class="breadcrumb-item"><a href="http://localhost:3000/blog-post">Blogs</a></li>
                                                <li class="breadcrumb-item active"><a>Single Blog</a></li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div class="detailed-course">
                    <section class="course-detail-sect">
                        <div className="row">
                            <div class="col-lg-8 col-md-8">


                                <p>
                                    {this.state.data.Text}
                                </p>
                                <div class="comment-box">
                                    <div>
                                        <span class="sorting-sp">0 Comments</span>
                                        <div class="select-buttn">
                                            <span>Sort by:</span>
                                            <select class="selectpicker">
                                                <option>Older</option>
                                                <option>Most Recent</option>
                                            </select>
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div class="widget-area no-padding blank">
                                        <div class="status-upload">
                                            <form>
                                                <div class="comnt-img">
                                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_hkkZxuMQQsFadXVxRKlrMUvI_O2O-idUS4Y43OD_xM6SVRQw"></img>
                                                </div>
                                                <textarea placeholder="Add a Comment..." ></textarea>
                                                <ul>
                                                    <li><a title="" data-toggle="tooltip" data-placement="bottom" data-original-title="Audio"><i class="fa fa-music"></i></a></li>
                                                    <li><a title="" data-toggle="tooltip" data-placement="bottom" data-original-title="Video"><i class="fa fa-video-camera"></i></a></li>
                                                    <li><a title="" data-toggle="tooltip" data-placement="bottom" data-original-title="Sound Record"><i class="fa fa-microphone"></i></a></li>
                                                    <li><a title="" data-toggle="tooltip" data-placement="bottom" data-original-title="Picture"><i class="fa fa-picture-o"></i></a></li>
                                                    <li>
                                                        <div class="custom-control custom-checkbox">
                                                            <input type="checkbox" class="custom-control-input" id="defaultchecked" />
                                                            <label class="custom-control-label" for="defaultchecked">Post on Facebook</label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                <button type="submit" class="btn btn-success green"><i class="fa fa-share"></i> Share</button>
                                            </form>
                                        </div>

                                        <p class="view-count-sec"><i class="fa fa-signal" aria-hidden="true"></i>Views: {this.state.data.Views}</p>

                                        <p class="links-categ">Category: <a href="#" Blog-do-vs />Vestibular Seriado By: <a href="#" Stoodi /><i class="fa fa-clock-o" aria-hidden="true"></i> October 17, 2018  <i class="fa fa-comment" aria-hidden="true"></i>0  2 views </p>

                                        <div class="col-lg-12 col-md-12 col-sm-12">
                                            <div class="row">
                                                <div class="col-lg-4 col-md-12 col-sm-12">
                                                    <div class="img-sect">
                                                        <div class="hoverb-img">
                                                            <img class="img-hoverb" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_hkkZxuMQQsFadXVxRKlrMUvI_O2O-idUS4Y43OD_xM6SVRQw"></img>
                                                            <div class="hoverb-text">
                                                                <div class="text-hoverb">BLOG-DO-VS</div>
                                                            </div>
                                                        </div>
                                                        <h4>Online Course Tips</h4>
                                                        <span class="date-d">October 19, 2018</span>
                                                        <span>What is the best career for me? This question does not ...</span>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-12 col-sm-12">
                                                    <div class="img-sect">
                                                        <div class="hoverb-img">
                                                            <img class="img-hoverb" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_hkkZxuMQQsFadXVxRKlrMUvI_O2O-idUS4Y43OD_xM6SVRQw"></img>
                                                            <div class="hoverb-text">
                                                                <div class="text-hoverb">BLOG-DO-VS</div>
                                                            </div>
                                                        </div>
                                                        <h4>Online Course Tips</h4>
                                                        <span class="date-d">October 19, 2018</span>
                                                        <span>What is the best career for me? This question does not ...</span>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-12 col-sm-12">
                                                    <div class="img-sect">
                                                        <div class="hoverb-img">
                                                            <img class="img-hoverb" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_hkkZxuMQQsFadXVxRKlrMUvI_O2O-idUS4Y43OD_xM6SVRQw"></img>
                                                            <div class="hoverb-text">
                                                                <div class="text-hoverb">BLOG-DO-VS</div>
                                                            </div>
                                                        </div>
                                                        <h4>Online Course Tips</h4>
                                                        <span class="date-d">October 19, 2018</span>
                                                        <span>What is the best career for me? This question does not ...</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="fb-comments" data-href="https://developers.facebook.com/docs/plugins/comments#configurator" data-numposts="5"></div>
                                <form class="contact-frm">
                                    <h4>Leave a Comment</h4>
                                    <p>Your Email Address will not be Published</p>
                                    <div class="form-group">
                                        <textarea class="form-control" id="exampleFormControlTextarea1" value rows="5" placeholder="Write a Comment.."></textarea>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="exampleFormControlInputText" placeholder="Name" />
                                    </div>
                                    <div class="form-group">
                                        <input type="email" class="form-control" id="exampleFormControlInputEmail" placeholder="Email Address" />
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="exampleFormControlInputSite" placeholder="Site" />
                                    </div>
                                    <div class="buttn-submit">
                                        <button type="submit" onClick={this.handleBlogComment} class="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                            <div class="col-lg-4 col-md-4">
                                <div className="recent">
                                    <h5>RECENT POSTS</h5>
                                    <ul>
                                        {this.state.recentPost.slice(0, 5).map((node, i) => {
                                            return (
                                                <li onClick={this.handleRecentBlog} data-value={node._id} key={i}>{node.Title}</li>
                                            )
                                        })}
                                    </ul>
                                </div>



                                <div className="categories">
                                    <h5>CATEGORIES</h5>
                                    <ul>
                                        {this.state.blogCategories.map((node, i) => {
                                            return (

                                                <li key={i} onClick={this.handleCategory} data-value={node._id}>{node.Title}</li>

                                            )
                                        })}
                                    </ul></div>




                            </div>
                        </div>

                    </section>
                </div>

            </div>




        );
    }
}

export default SingleBlog;