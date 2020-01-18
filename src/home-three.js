import React from 'react';
import Navbar from './components/navbar';
import Blog from './components/blog';
import Course from './components/feature_course'
import CourseUniversities from './components/courses_universities'
import Searchbox from './components/Searchbox'


class HomeThree extends React.Component {

	constructor() {
		super()
		this.state = {
			isOpen: false,
			issearchdropdownVisible: false,
			searchDropDown: true,
			userDetail: {}

		}
		this.openModal = this.openModal.bind(this)

	}


	showDropdown = () => {
		this.setState({ searchDropDown: true })
		console.log("showDropdown is called")
	}
	hideDropdown = () => {
		this.setState({ searchDropDown: false })
	}


	openModal() {
		this.setState({ isOpen: true })
	}
	userDetailhandler = (userDetail) => {
		this.setState({ userDetail: userDetail })
	}

	render() {
		console.log("userdetail", this.state.userDetail)


		document.body.classList.remove('landing-page');
		document.body.classList.remove('home-style-two');
		document.body.classList.add('home-style');
		document.body.classList.add('three');
		let backgroundImage = '../assets/images/banner1.png'
		return (
			<div onClick={this.hideDropdown}>
				<div className="main_classfrbg">

					<Navbar history={this.props.history}
						userDetailhandler={this.userDetailhandler} />
					<section id="home" className="home home-three vertical-scrolling" style={{ backgroundImage: `url(${backgroundImage})` }}>
						<div className="container">
							<div className="banner_text">
								<div className="row">
									<div className="col-lg-12 col-md-12 col-sm-12s">
										<h1 className="banner_hed text-center">Find the course of your dreams!</h1>
										<div className="inp_box_content">
											<Searchbox
												userDetail={this.state.userDetail}
												{...this.props}
												showDropdown={this.showDropdown}
												searchDropDown={this.state.searchDropDown}
												showDropdown={this.showDropdown}
												textvisible={this.state.textvisible} />
										</div>
									</div>
								</div>
							</div>
						</div>

					</section>


					{/* Course Component */}
					<Course />

					{/* Courses and universities */}
					<CourseUniversities />

					{/*Blog Component*/}

					<Blog />
				</div>
			</div>
		);
	}

}

export default HomeThree;