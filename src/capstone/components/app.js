import React, { lazy, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import NotFound from "./NotFound";
const Profile = lazy(() => import("./Profile"));
const IssuesList = lazy(() => import("./IssuesList"));
const About = lazy(() => import("./about"));
const IssueForm = lazy(() => import("./IssueForm"));
const EditIssue = lazy(() => import("./EditIssue"));
const Login = lazy(() => import("./Login"));
const Register = lazy(() => import("./Register"));
const ViewIssue = lazy(() => import("./ViewIssue"));
const Chart = lazy(() => import("./Chart"));

const App = () => {
  const authinfo = sessionStorage.getItem("auth");
  return (
    <div className="container">
      <Router>
        <Navbar />
        <Suspense
          fallback={
            <div className="loading">
              <p>Loading please wait.......</p>
            </div>
          }
        >
          <Switch>
            <Route path="/" exact component={IssuesList} />
            <Route path="/about" exact component={About} />
            <Route path="/chart" exact component={Chart} />
            <Route
              path="/add"
              exact
              component={() => <IssueForm authorized={authinfo} />}
            />
            <Route path="/signin" exact component={Login} />
            <Route path="/signup" exact component={Register} />
            <Route path="/issues/:id" exact component={ViewIssue} />
            <Route path="/edit/:id" exact component={EditIssue} />
            <Route
              path="/profile"
              exact
              component={() => <Profile authorized={authinfo} />}
            />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
