import React from 'react';
import Navbar from './navbar'
import Searchbox from '../components/Searchbox';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import StarRatingComponent from 'react-star-rating-component';


class SingleCourseDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            single_Courses_detail: "",
            textvisible: false,
            searchDropDown: true,
            notInHomeThree: true,
            rating: 1,
            currentComments: [],
            purpose: "I study here",
            userDetail: this.props.location,
            universityDetail: {}

        }
    }


    componentDidMount() {
        // debugger
        fetch('https://www.clixtest.cf/course/' + this.props.match.params.course_id)
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then((data) => {
                this.setState({ single_Courses_detail: JSON.stringify(data) });
                console.log("single course detail", JSON.stringify(data))
            });


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
    onStarClick = (nextValue, prevValue, name) => {
        this.setState({ rating: nextValue });
    }
    handleCommentsCourses = () => {
        var textarea = document.getElementById("myTextarea").value
        var d = new Date();



        var commentData = {
            "user_name": this.props.location.userDetail.userDetail.name,
            "image_url": this.props.location.userDetail.userDetail.picture.data.url,
            "purpose": this.state.purpose,
            "rating": this.state.rating,
            "assessment": textarea,
            "course_id": this.props.match.params.course_id,
            "created_at": d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
        }
        var currentComments = this.state.currentComments.slice(0)
        currentComments.push(commentData)
        console.log("currentCommnets data", currentComments)
        this.setState({ currentComments: currentComments })

    }
    purposeHandler = (e) => {
        var purpose = e.target.value
        this.setState({ purpose: purpose })
    }


    render() {

        const { rating } = this.state;
        const mapStyle = {
            height: '300px',
            width: '900px'
        }
        const data = (this.state.single_Courses_detail != null ? this.state.single_Courses_detail.university : null)
        console.log("data  ====================================>", data)

        return (

            <div onClick={this.hideDropdown} >
                <div className="navbar">
                    <div class="nav-title">
                        <img src={"https://2n6nxy34fo7t3i43ol234qil-wpengine.netdna-ssl.com/wp-content/uploads/2018/05/logo_stoodi_carreiras_141x48.png"} />
                    </div>
                    <div className="searchbox-wrapper"><Searchbox
                        notInHomeThree={this.state.notInHomeThree}
                        searchDropDown={this.state.searchDropDown}
                        issearchdropdownVisible={this.state.issearchdropdownVisible}
                        showDropdown={this.showDropdown}
                        isSingleCourseDetail_searchbox={this.state.isSingleCourseDetail_searchbox}
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
                <section className="sing-course">
                    <div className="container-fluid">
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-lg-9">
                                    <div className="l-sect">
                                        <nav aria-label="breadcrumb" className="blog-bradcrumb2">
                                            <ol className="breadcrumb2 bg-transparent mb-0">
                                                <li className="breadcrumb-item"><a href="/">Home</a></li>
                                                <li className="breadcrumb-item active"><a href={null}>Course Details</a></li>
                                            </ol>
                                        </nav>
                                        <div className="head-det">
                                            <h3 className="dark-hed">{this.state.single_Courses_detail.Title}</h3>
                                            <h3 className="light-hed">FIEO UNIVERSITY CENTER</h3>
                                        </div>

                                        <div className="ltomap">
                                            <span>Av. Franz Voegeli, 300 - Vila Yara - Osasco - SP</span>
                                            <a href="#">(Show map)</a>
                                        </div>


                                        <div className="tel-no">
                                            <span>
                                                Tel: (11) 3651-9999
                                </span>
                                        </div>

                                        <div className="rating-sect">
                                            <div className="star-sect">
                                                <div className="star-wrap">
                                                    <i class="fa fa-star" aria-hidden="true"></i>
                                                    <i class="fa fa-star" aria-hidden="true"></i>
                                                    <i class="fa fa-star-o" aria-hidden="true"></i>
                                                    <i class="fa fa-star-o" aria-hidden="true"></i>
                                                    <i class="fa fa-star-o" aria-hidden="true"></i>
                                                </div>
                                                <div className="rat-val">
                                                    <span className="value">2.3</span>
                                                </div>



                                            </div>

                                            <div className="rat-sec">
                                                <span>0 ratings</span>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="rating-sect">
                                            <div className="below-star-sect">
                                                <div>
                                                    <i class="fa fa-heart-o" aria-hidden="true"></i>
                                                </div>
                                                <div className="avtar">
                                                    <img src="https://graph.facebook.com/10209612181741960/picture?width=24&height=24" />
                                                </div>
                                                <div className="username">
                                                    <span>Conrad Bicalho</span>
                                                </div>

                                            </div>
                                            <div className="fav-sec">
                                                <i class="fa fa-heart" aria-hidden="true"></i>
                                                <span>To favor</span>
                                            </div>
                                        </div>
                                        <div className="map-wrap">
                                            <Map google={this.props.google} zoom={14} style={mapStyle}>

                                                <Marker onClick={this.onMarkerClick}
                                                    name={'Current location'} />


                                            </Map>
                                        </div>



                                        <div className="course-info">
                                            <div className="info-inner">
                                                <h3>Course Information</h3>
                                                <div className="shiift-det">
                                                    <span>Shift</span>
                                                    <span className="value">Morning, Evening</span>
                                                    <span>Duration</span>
                                                    <span className="value">2 Years</span>
                                                </div>
                                                <div className="course-info-bottom">
                                                    <span>Modality</span>
                                                    <span className="value">-</span>
                                                    <span>Category</span>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="course-info">
                                            <div className="info-inner">
                                                <h3>Data from the last selection process</h3>
                                                <div className="shiift-det">
                                                    <span>Number of Candidates</span>
                                                    <span className="value">260</span>
                                                    <span>Number of vacancies</span>
                                                    <span className="value">260</span>
                                                </div>
                                                <div className="course-info-bottom">
                                                    <span>List of Vacant Candidates</span>
                                                    <span className="value">1.00</span>
                                                    <span>Concept CPC (MEC)</span>
                                                </div>
                                                <div className="course-info-bottom">
                                                    <span>Average price</span>
                                                    <span className="value">Free</span>

                                                </div>
                                            </div>

                                        </div>
                                        <div className="qa-section">
                                            <div className="answer">The FIEO UNIVERSITY CENTER course, also called ANALYSIS AND SYSTEM DEVELOPMENT, is a course in the area of ​​Science, Mathematics and Computing, located on the campus of OSASCO, in SÃO PAULO.</div>
                                            <div className="question">What is the campus address of the Systems Analysis and Development course at FIEO UNIVERSITY CENTER?</div>
                                            <div className="answer">The campus is located at Av. Franz Voegeli, 300 - Vila Yara - Osasco - SP OSASCO SÃO PAULO 06020-190.</div>
                                            <div className="question">What are the available schedules for Analysis and development of systems at CENTRO UNIVERSITÁRIO FIEO?</div>
                                            <div className="answer">The course is available in the Morning, Evening.</div>
                                            <div className="question">What is the duration of the System Analysis and Development course at FIEO UNIVERSITY CENTER?</div>
                                            <div className="answer">The duration is 2 years.</div>
                                            <div className="question">What is the type of diploma / degree course in Systems Analysis and Development at FIEO CENTRO UNIVERSITÁRIO?</div>
                                            <div className="answer">The course title is Technological.</div>
                                            <div className="question">How often does the course on Systems Analysis and Development at FIEO UNIVERSITY CENTER occur?</div>
                                            <div className="answer">The periodicity of the course is Semester</div>
                                            <div className="question">What is the mode of analysis and development of systems at the FIEO CENTRO UNIVERSITÁRIO?</div>
                                            <div className="answer">This is a Classroom course</div>
                                            <div className="question">What is the policy of quotas of the Course of Analysis and development of systems in CENTRO UNIVERSITÁRIO FIEO?</div>
                                            <div className="answer">Does not adopt</div>
                                            <div className="question">How many candidates did the last university entrance examination of the course of Analysis and development of systems in the CENTER UNIVERSITY FIEO?</div>
                                            <div className="answer">There were 260 candidates.</div>
                                            <div className="question">How many vacancies does the Course of Analysis and development of systems in the CENTRO UNIVERSITÁRIO FIEO offer?</div>
                                            <div className="answer">260 seats are offered.</div>
                                            <div className="question">How many candidates per vacancy does the Systems Analysis and Development course at FIEO UNIVERSITY CENTER?</div>
                                            <div className="answer">The ratio is 1 candidate per job.</div>
                                            <div className="question">Do not know which profession to follow?</div>
                                            <div className="answer">Do not panic! Find out exactly what you should do here .</div>
                                            <div className="question">What are the contacts of FIEO UNIVERSITÁRIO CENTRO?</div>
                                            <div className="ques-ans"><span className="question">Website:</span>
                                                <span className="answer">www.unifieo.br </span></div>

                                        </div>
                                        <div className="ques-ans"><span className="question">Email:</span>
                                            <span className="answer">reitoria@unifieo.br; planning@unifieo.br  </span></div>
                                        <div className="ques-ans"><span className="question">Telephone:</span>
                                            <span className="answer"> (11) 3681 6000 R-238  </span></div>
                                        <div className="answer">
                                            The average evaluation of the university is 3 by the users and the MEC.</div>

                                        <div className="answer">This university accepts the Enem's note in the selection process</div>

                                        <div className="answer">This university adopts PROUNI</div>
                                        <div className="answer">Do not adopt</div>
                                        <div className="presaved-comments"></div>
                                        {this.state.currentComments.length > 0 ? <div>{this.state.currentComments.map((node, i) => {
                                            return (
                                                <div className="current-comments">
                                                    <div className="user-pic"><img src={'https://graph.facebook.com/1490938147706663/picture?width=50&height=50'} alt="boohoo" className="img-responsive" /></div>
                                                    <div className="user-details">
                                                        <div className="user-timestamp">
                                                            <span className="name">{node.user_name}</span>
                                                            <span className="timestamp"> &#128338;{node.created_at}</span>
                                                        </div>
                                                        <div className="rating-content">
                                                            <span className="rating"><StarRatingComponent

                                                                starCount={10}
                                                                value={node.rating}

                                                            /></span>
                                                            <span className="content"> 	&#10004; {node.purpose}</span>
                                                        </div>
                                                    </div>

                                                </div>
                                            )
                                        }

                                        )}</div> : null}

                                        <div className="feedback">
                                            <div className="rating-wrapper">
                                                <span>Note</span><div className="rating"><StarRatingComponent
                                                    name="rate1"
                                                    starCount={10}
                                                    value={rating}
                                                    onStarClick={this.onStarClick}
                                                /></div>
                                                <div className="study">
                                                    <select onChange={this.purposeHandler}>
                                                        <option value="I study here">I study here</option>
                                                        <option value="I want study here">I want study here</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="textarea">
                                                <span>ASSESSMENTS</span>
                                                <textarea id="myTextarea" ></textarea>
                                                <button onClick={this.handleCommentsCourses}>PUBLISH RATING</button>
                                            </div>


                                        </div>
                                    </div>

                                </div>



                                <div className="col-lg-3">
                                    <div className="ad-sect">
                                        <div className="img-sect-ad">
                                            <img src="https://2n6nxy34fo7t3i43ol234qil-wpengine.netdna-ssl.com/wp-content/uploads/elementor/thumbs/CTA-nzv2ex1imuqf11kt7tadugzpwtijvf94flqxo3lbeo.png" title="CTA" alt="CTA" />
                                            <div className="button"><button type="button" style={{ backgroundColor: "#fff", color: "#3d3d3d", fontSize: "14px" }} class="btn btn-default">Report a problem with this page</button></div>


                                        </div>




                                        <div className="university">
                                            <div className="cover-pic-wrapper">
                                                <div className="cover-photo">
                                                    <img className="profile-pic" src="https://2n6nxy34fo7t3i43ol234qil-wpengine.netdna-ssl.com/wp-content/uploads/2018/04/400px-Symbolfumg-2-150x150.jpg" />
                                                </div>
                                            </div>
                                            <div className="university-name">
                                                <span>FEDERAL UNIVERSITY OF MINAS GERAIS {data ? data.Name : null} </span>
                                            </div>
                                            <div className="web"><span>http://www.ufmg.br</span></div>
                                            <div className="mail"><span>reitor@ufmg.br</span></div>
                                            <div className="university-text">
                                                <span>The Federal University of Minas Gerais (UFMG) is a Brazilian federal public higher education institution, based in the city of Belo Horizonte, in the state of Minas Gerais. It is the largest university in the state, having campuses in the cities of Belo Horizonte, Tiradentes and Montes Claros. In addition to developing programs and teaching projects, at the undergraduate and graduate levels, research and extension, in the form of face-to-face activities, and distance, in eight areas of knowledge, the University also offers in the Fundamental School, in the Technical College, in the Nucleus of Agrarian Sciences and in the University Theater, courses of basic and professional education of average level. According to the Ministry of Education - MEC, UFMG is the second university that receives the most resources from the federal government, since it is one of the most offering courses and programs for teaching, research and extension. UFMG is also one of the largest nuclei of innovation in Brazil, in 2010 UFMG was the Brazilian institution that most requested patents according to data from the National Institute of Industrial Property (INPI). The university registered in 2010 350 national and 110 international patents. Among several international and national indicators that evaluate universities, UFMG has stood out as one of the most important universities in Brazil, particularly with a growing international presence as pointed out by the Academic Ranking of World Universities (ARWU). According to ARWU, UFMG is ranked among the top five universities in Brazil and the world is in the range of 301-400 best universities. In 2013,</span>
                                            </div>
                                            <div className="selective-process-container">
                                                <div className="selective-process">
                                                    <div className="item-label"><span>Selective process</span></div>
                                                    <div className="item-value"><span>-</span></div>

                                                </div>
                                            </div>
                                            <div className="selective-process-container">
                                                <div className="selective-process">
                                                    <div className="item-label"><span>Frequency</span></div>
                                                    <div className="item-value"><span>Yearly</span></div>

                                                </div>
                                            </div>
                                            <div className="selective-process-container">
                                                <div className="selective-process">
                                                    <div className="item-label"><span>Quotas</span></div>
                                                    <div className="item-value"><span>50% for public school students% for extra places for Indians.</span></div>

                                                </div>
                                            </div>
                                            <div className="selective-process-container">
                                                <div className="selective-process">
                                                    <div className="item-label"><span>AND EITHER</span></div>
                                                    <div className="item-value"><span>-</span></div>

                                                </div>
                                            </div>
                                            <div className="selective-process-container">
                                                <div className="selective-process">
                                                    <div className="item-label"><span>ProUni</span></div>
                                                    <div className="item-value"><span>-</span></div>

                                                </div>
                                            </div>
                                            <div className="selective-process-container">
                                                <div className="selective-process">
                                                    <div className="item-label"><span>FIES</span></div>
                                                    <div className="item-value"><span>-</span></div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div >


        );
    }
}



export default GoogleApiWrapper({
    apiKey: ("AIzaSyAhG0MxYGxWRvL4aO5VDABYZ_Xohlp9kMg")
})(SingleCourseDetail)