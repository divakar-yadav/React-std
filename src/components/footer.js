import React from 'react';


class Footer extends React.Component {
    render() {

        return (
            <div>
                <section className="p-0">
                    <div className="container-fluid">
                        <div className="bottom-section">
                            <div className="img-bottom text-center">
                                <img src="https://2n6nxy34fo7t3i43ol234qil-wpengine.netdna-ssl.com/wp-content/uploads/2018/05/logo_stoodi_carreiras_141x48.png"></img>
                            </div>
                            <div className="copyright-section index-footer">
                                <p>© 2018 Stoodi. All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </section>



                <div className="tap-top">
                    <div>
                        <i className="fa fa-angle-double-up"></i>
                    </div>
                </div>
            </div>
        );
    }
}


export default Footer;