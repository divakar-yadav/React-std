import React from 'react';
import Searchbox from '../components/Searchbox';
import { withRouter } from 'react-router-dom'
class Blog extends React.Component {

      constructor(props) {
            super(props)
            this.state = {
                  data: [{ Title: "CONTROL AND AUTOMATION ENGINEERING", Content: "The Control and Automation Engineering course at the FEDERAL UNIVERSITY OF MINAS GERAIS, also called CONTROL AND AUTOMATION ENGINEERING, is a course in the area of ​​Engineering, ..." },
                  { Title: "ANALYSIS AND SYSTEMS DEVELOPMENT", Content: "The FIEO UNIVERSITY CENTER course, also called ANALYSIS AND SYSTEM DEVELOPMENT, is a course in the area of ​​Science, Mathematics and ..." },
                  { Title: "MEDICINE", Content: "The Medicine course of the UNIVERSIDADE ESTADUAL DO PIAUÍ, also called MEDICINA, is a course in the area of ​​Health and social well-being, located on the campus of the city of TERESINA, in..." }]
            }
      }
      handleSingleBlog = () => {
            this.props.history.push('/single-blog')
            console.log("handleSingleBlog is called");
      }

      componentDidMount = () => {
            fetch('https://www.clixtest.cf/blog')
                  .then(response => {
                        if (response.status >= 400) {
                              throw new Error("Bad response from server");
                        }
                        return response.json();
                  })
                  .then(data => {
                        console.log("---->>>>", JSON.stringify(data))
                        this.setState({ data: data })
                  });
      }
      handleSingleBlog = (e) => {
            var blog_id = e.currentTarget.getAttribute('data-value')
            this.props.history.push('/single-blog/' + blog_id)

      }

      render() {

            // Dynamic Blog Data Loop
            let DataList = this.state.data.map((val, i) => {
                  return (
                        <div key={i} className="col-lg-4 col-md-12 col-sm-12" >
                              <div className="card" style={{ margin: '0.5rem' }} data-value={val._id} onClick={this.handleSingleBlog}>
                                    <div className="img-data">
                                          <img className="card-img-top" src="assets/images/feature2.png" alt="Card image cap" onError={(e) => { e.target.onerror = null; e.target.src = `assets/images/blog/1.jpg` }} />
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
                                          <a className="card-title" >{val.Title}</a>
                                          <ul class="book-links">
                                                <li><i class="fa fa-bookmark" aria-hidden="true"></i>Engineering</li>
                                                <li><i class="fa fa-map-marker" aria-hidden="true"></i>
                                                      BELO HORIZONTE</li>
                                          </ul>
                                          <hr />
                                          <p className="card-text">{val.Content}</p>
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

            return (
                  <div>

                        <section id="blog" className="blog">
                              <div className="about-decor">
                                    <div className="about-circle1"><img src="assets/images/team1.png" alt="" /></div>
                                    <div className="about-circle2"><img src="assets/images/main-banner1.png" alt="" /></div>
                              </div>
                              <div className="content-sec">
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


                                    </div>
                              </div>
                        </section>
                  </div>
            );
      }
}


export default withRouter(Blog);