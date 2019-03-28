import React, { Component } from "react";
import { withFirebase } from "react-redux-firebase";
import { connect } from "react-redux";
import { Menu, Container, Button, Responsive, Icon } from "semantic-ui-react";
import { Link, NavLink, withRouter } from "react-router-dom";
import SignedOutMenu from "../Menus/SignedOutMenu";
import SignedInMenu from "../Menus/SignedInMenu";
import { openModal } from "../../modals/modalActions";

const actions = {
  openModal
};

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

class NavBar extends Component {
  handleSignIn = () => {
    this.props.openModal("LoginModal");
  };

  handleRegister = () => {
    this.props.openModal("RegisterModal");
  };

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push("/");
  };

  render() {
    const { auth, profile } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;

    return (
      <>
        <Responsive as={Menu} maxWidth={669} inverted fixed="top" style={{zIndex: '1000'}}>
					<Container>
            <Menu.Item as={Link} to="/">
              <img src="/assets/logo.png" alt="logo" />
            </Menu.Item>
            <Menu.Item name='gamepad' as={NavLink} to="/events">
							<Icon name='gamepad' size="large" inverted />
						</Menu.Item>
            {authenticated ? (
              <SignedInMenu
                auth={auth}
                profile={profile}
                signOut={this.handleSignOut}
              />
            ) : (
              <SignedOutMenu
                register={this.handleRegister}
                signIn={this.handleSignIn}
              />
            )}
          </Container>
				</Responsive>

        <Responsive as={Menu} minWidth={670} inverted fixed="top" style={{zIndex: '1000'}}>
          <Container>
            <Menu.Item as={Link} to="/">
              <img src="/assets/logo.png" alt="logo" />
              <Responsive minWidth={768}>Kiyv-meet</Responsive>
            </Menu.Item>
            <Menu.Item as={NavLink} to="/events" name="Встречи" />
            <Menu.Item>
              <Button
                as={Link}
                to="/createEvent"
                floated="right"
                positive
                inverted
                content="Предложить встречу"
              />
            </Menu.Item>
            {authenticated ? (
              <SignedInMenu
                auth={auth}
                profile={profile}
                signOut={this.handleSignOut}
              />
            ) : (
              <SignedOutMenu
                register={this.handleRegister}
                signIn={this.handleSignIn}
              />
            )}
          </Container>
        </Responsive>
      </>
    );
  }
}

export default withRouter(
  withFirebase(
    connect(
      mapState,
      actions
    )(NavBar)
  )
);
