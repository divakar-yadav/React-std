import React from 'react';
import { Link } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login';


class Navbar extends React.Component {

	handleUserDetail = (response) => {

		// console.log(JSON.stringify(response));
		this.props.userDetailhandler(response)
		var formData = {
			"NAME": response.name,
			"userPhoto": response.picture.data.url,
			"email": response.email,
			"favourite": "You can put comment here"
		}

		// fetch('www.clixtest.cf/usermanagment', {
		// 	method: 'POST',
		// 	body: formData
		// })
		// 	.then(response => response.json())

	}


	render() {



		return (
			<nav className="navbar navbar-expand-lg navbar-light theme-nav fixed-top">
				<div className="content-sec">
					<a className="navbar-brand" href={`${process.env.PUBLIC_URL}/`}><img src={"https://2n6nxy34fo7t3i43ol234qil-wpengine.netdna-ssl.com/wp-content/uploads/2018/05/logo_stoodi_carreiras_141x48.png"} /></a>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse default-nav" id="navbarSupportedContent">
						<FacebookLogin
							appId="358051211692390"
							autoLoad={true}
							fields="name,email,picture"

							callback={this.handleUserDetail}
						/>
						<ul className="navbar-nav ml-auto" id="mymenu">
							<li className="nav-item" onClick={() => this.props.history.push('popular-courses')}>
								<a className="nav-link" >Courses</a>
							</li>
							<li className="nav-item" onClick={() => this.props.history.push('/blog-post')}>
								<a className="nav-link" >Blog</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="https://stoodi.zendesk.com/hc/pt-br/requests/new" data-menuanchor="contact">contact us</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="https://stoodi.zendesk.com/hc/pt-br/requests/new" data-menuanchor="contact"><i className="fa fa-user-o" aria-hidden="true">
								</i></a>

							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

export default Navbar;