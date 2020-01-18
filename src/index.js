import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import NoMatch from './pages/404';
import HomeThree from './home-three';
import BlogPost from './components/BlogPost'
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SingleCourseDetail from './components/SingleCourseDetail';
import Courses from './pages/Courses';
import SingleBlog from './pages/SingleBlog'
import Footer from './components/footer';
import Contact from './components/contact';
import SingleCategoryblogs from './components/SingleCategoryblogs';
import PopularCourses from './components/PopularCourses';
class Root extends React.Component {
	render() {
		return (
			<div>
				<BrowserRouter basename={'/'} >
					<Switch>
						<Route exact path={`${process.env.PUBLIC_URL}/`} component={HomeThree} />
						<Route path={`${process.env.PUBLIC_URL}/course-detail/:course_id`} component={SingleCourseDetail} />
						<Route path={`${process.env.PUBLIC_URL}/course/:id`} component={Courses} />
						<Route path={`${process.env.PUBLIC_URL}/blog-post`} component={BlogPost} />
						<Route path={`${process.env.PUBLIC_URL}/single-cat-blog/:cat_id`} component={SingleCategoryblogs} />
						<Route path={`${process.env.PUBLIC_URL}/contact-us`} component={Contact} />
						<Route path={`${process.env.PUBLIC_URL}/popular-courses`} component={PopularCourses} />
						<Route path={`${process.env.PUBLIC_URL}/single-blog/:blog_id`} component={SingleBlog} />
						{/* <Route component={NoMatch} /> */}
					</Switch>
				</BrowserRouter>
				<Footer />
			</div>

		);
	}
}

ReactDOM.render(<Root />, document.getElementById('root'));

registerServiceWorker();
