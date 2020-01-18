import React from 'react';
import { withRouter } from 'react-router-dom'

class Course extends React.Component {
      constructor(props) {
            super(props)
            this.state = {
                  data: [{ Title: "CONTROL AND AUTOMATION ENGINEERING", Content: "The Control and Automation Engineering course at the FEDERAL UNIVERSITY OF MINAS GERAIS, also called CONTROL AND AUTOMATION ENGINEERING, is a course in the area of ​​Engineering, ..." },
                  { Title: "ANALYSIS AND SYSTEMS DEVELOPMENT", Content: "The FIEO UNIVERSITY CENTER course, also called ANALYSIS AND SYSTEM DEVELOPMENT, is a course in the area of ​​Science, Mathematics and ..." },
                  { Title: "MEDICINE", Content: "The Medicine course of the UNIVERSIDADE ESTADUAL DO PIAUÍ, also called MEDICINA, is a course in the area of ​​Health and social well-being, located on the campus of the city of TERESINA, in..." }]
            }
      }
      componentDidMount = () => {
            fetch('https://www.clixtest.cf/course?TopRated=true')
                  .then(response => {
                        if (response.status >= 400) {
                              throw new Error("Bad response from server");
                        }
                        return response.json();
                  })
                  .then(data => {
                        console.log("---->>>>Top rated courses", data)
                        this.setState({ data })
                  });
      }
      handleSingleCourses = (e) => {

            var course_id = e.currentTarget.getAttribute('data-value')
            this.props.history.push(`course-detail/` + course_id);
      }

      render() {

            // Dynamic Blog Data Loop
            let DataList = this.state.data.map((val, i) => {
                  return (
                        <div key={i} className="col-lg-4 col-sm-12 col-md-12" onClick={this.handleSingleCourses} data-value={val._id}>
                              <div className="card" style={{ margin: '0.5rem' }}>
                                    <div className="img-data">
                                          <img className="card-img-top" src="assets/images/feature2.png" alt="Card image cap" onError={(e) => { e.target.onerror = null; e.target.src = `assets/images/blog/1.jpg` }} />
                                          <div className="clicks-data">
                                                <a href="#" className="link1"><i className="fa fa-heart" aria-hidden="true"></i>Favourite</a>
                                          </div>
                                          <div className="clicks-data2">
                                                <a href="#" className="link2"><i className="fa fa-eye" aria-hidden="true"></i>Preview</a>
                                          </div>
                                    </div>
                                    <div className="card-body">
                                          <a href="#" className="card-title">{val.Title}</a>
                                          <ul className="book-links">
                                                <li><i className="fa fa-bookmark" aria-hidden="true"></i>Engineering</li>
                                                <li><i className="fa fa-map-marker" aria-hidden="true"></i>
                                                      BELO HORIZONTE</li>
                                          </ul>
                                          <hr />
                                          <p className="card-text">{val.Content}</p>
                                    </div>
                                    <div className="card-footer">
                                          <small className="text-muted">
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                <i className="fa fa-star" aria-hidden="true"></i>
                                          </small>
                                    </div>
                              </div>
                        </div>
                  );
            });

            return (
                  <section id="blog" className="blog">
                        <div className="about-decor">
                              <div className="about-circle1"><img src="assets/images/team1.png" alt="" /></div>
                              <div className="about-circle2"><img src="assets/images/main-banner1.png" alt="" /></div>
                        </div>
                        <div className="content-sec">
                              <div className="row">
                                    <div className="col-sm-12">
                                          <div className="top-contentt">
                                                <h2 className="title">FEATURED<span> COURSES</span></h2>
                                                <span>See the best courses in the country here!</span>
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
            );
      }
}



export default withRouter(Course);