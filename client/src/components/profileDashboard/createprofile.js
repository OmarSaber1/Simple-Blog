import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import "./createprofile.css";
import { createProfile } from "../../actions/profile";
import { connect } from "react-redux";

const CreateProfile = ({ createProfile, history }) => {
  const [toggleSoicalIcons, toggleDsipaly] = useState(false);

  const [formData, setformData] = useState({
    company: "",
    location: "",
    status: "",
    bio: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });

  const {
    company,
    location,
    status,
    bio,
    facebook,
    twitter,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <div className="text-center">
        <h1>
          {" "}
          <i className="fa fa-user" /> Create Your Profile!
        </h1>
      </div>
      <h3 className="text-primary">Please fill the informtion below!</h3>
      *required
      <div>
        <select
          name="status"
          required
          className="btn btn-primary"
          value={status}
          onChange={(e) => onChange(e)}
        >
          <option value="">* Select Your Career</option>
          <option>Student</option>
          <option>Fresh Graduated</option>
          <option>Junior Developer</option>
          <option>Mid-Senior Developer</option>
          <option>Senior Developer</option>
          <option>Team Leader</option>
          <option>Intern</option>
          <option>other...</option>
        </select>
        <br></br>
        <small>Please enter you career level!</small>
      </div>
      {/*  */}
      <div>
        <input
          name="company"
          onChange={(e) => onChange(e)}
          value={company}
          className="form-control mt-4  "
          type="text"
          placeholder="Company"
        />
        <small>Please enter a valid company!</small>

        <input
          name="location"
          onChange={(e) => onChange(e)}
          value={location}
          className="form-control mt-4  "
          type="text"
          placeholder="Location"
        />
        <small>Please enter a valid location!</small>

        <br></br>
        <br></br>
        <br></br>
        <small>Please Enter you Bio</small>
        <br />
        <textarea
          value={bio}
          onChange={(e) => onChange(e)}
          rows="4"
          cols="50"
          placeholder="please enter a brief about yourself."
          name="bio"
        ></textarea>
        <br></br>
        <br></br>
      </div>
      <div>
        <button
          onClick={() => toggleDsipaly(!toggleSoicalIcons)}
          className="btn btn-primary"
          type="button"
        >
          Toggle to display
        </button>{" "}
        <span className="bg-light">Optional</span>
        <br />
        <br />
        {/* Toggole display socail  */}
        {toggleSoicalIcons && (
          <Fragment>
            <div>
              <span>
                <i className="fab fa-2x fa-facebook text-primary"></i>
              </span>
              <input
                name="facebook"
                onChange={(e) => onChange(e)}
                value={facebook}
                className="form-control mb-3  "
                type="text"
                placeholder="FaceBook Link..."
              />
            </div>
            <div>
              <span>
                <i className="fab fa-2x fa-twitter text-info"></i>
              </span>
              <input
                name="twitter"
                onChange={(e) => onChange(e)}
                value={twitter}
                className="form-control mb-3  "
                type="text"
                placeholder="Twitter Link..."
              />
            </div>
            <div>
              <span>
                <i className="fab fa-2x fa-youtube text-danger"></i>
              </span>
              <input
                name="youtube"
                onChange={(e) => onChange(e)}
                value={youtube}
                className="form-control mb-3  "
                type="text"
                placeholder="Youtube Link..."
              />
            </div>
            <div>
              <span>
                <i className="fab fa-2x fa-linkedin text-primary"></i>
              </span>
              <input
                name="linkedin"
                onChange={(e) => onChange(e)}
                value={linkedin}
                className="form-control mb-3  "
                type="text"
                placeholder="Linkedin Link..."
              />
            </div>
            <div>
              <span>
                <i className="fab fa-2x fa-instagram text-danger"></i>
              </span>
              <input
                name="instagram"
                onChange={(e) => onChange(e)}
                value={instagram}
                className="form-control mb-3  "
                type="text"
                placeholder="instagram Link..."
              />
            </div>
          </Fragment>
        )}
      </div>
      <div className="text-center mt-4 mb-5">
        <button type="submit" className="btn btn-primary  mr-5">
          Save
        </button>
        <button className="btn btn-light ml-5">cancel</button>
      </div>
    </form>
  );
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
