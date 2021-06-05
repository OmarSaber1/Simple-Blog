import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../../components/auth/register";
import Login from "../../components/auth/login";
import Dashboard from "../../components/dashboard/dashboard";
import PrivateRoute from "../../components/routing/privateRoute";
import CreateProfile from "../../components/profileDashboard/createprofile";
import EditProfile from "../../components/profileDashboard/editprofile";
import Profiles from "../../components/profiles/profiles";
import Profile from "../../components/profiles/profile";
import NotFound from "../../components/layout/notfound";
import Posts from "../../components/posts/posts";
import Post from "../../components/posts/post";

export const Routes = () => {
  return (
    <section className="container">
      <Switch>
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/profile/:id" component={Profile} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/post/:id" component={Post} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/developers" component={Profiles} />
        <Route exact component={NotFound} />
      </Switch>
    </section>
  );
};
