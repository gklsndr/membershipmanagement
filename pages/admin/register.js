import { useState, useRef } from "react";
import dashify from "dashify";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import SignaturePad from 'react-signature-canvas';

const Register = () => {
  // const signPadRef = useRef();
  let signPad = {};
  const [content, setContent] = useState({
    name: "",
    // dob_day: "",
    // dob_month: "",
    // dob_year: "",
    // mobile: "",
    // email: "",
  });

  const router = useRouter();

  const clearSignature = () => {
    signPad.clear();
  };
  const onChange = (e) => {
    const { value, name } = e.target;
    setContent((prevState) => ({ ...prevState, [name]: value }));

    console.log(value, name);
  };
  const onSubmit = async (e) => {
    //const { title, body } = content;
    console.log("submitted");
    e.preventDefault();
    try {
      const response = await axios.post("/api/entry", content);
      console.log(response);
      const success = response.status === 200;
      if (success) {
        console.log(response.data.id);
        router.push(
          "https://pages.razorpay.com/pl_KlyWMEbHVZVLwc/view/?email=" +
            content.email +
            "&phone=" +
            content.mobile
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="onboarding">
      <div className={"image-container"}>
        <Image
          className="image"
          src="/images/kau-logo.png"
          alt="Autorickshaw Driver's Union (R) CITU"
          fill
        />
      </div>
      <h2>Application for Membership</h2>
      <form>
        <section>
          <label htmlFor="name"> Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            required={true}
            value={content.name}
            onChange={onChange}
          />
          <label htmlFor="father_name">Father's Name</label>
          <input
            id="father_name"
            type="text"
            name="fatherName"
            placeholder="Father's Name"
            required={true}
            value={content.fatherName}
            onChange={onChange}
          />
          <label  htmlFor="dob">Date of Birth</label>

            <input
              id="dob"
              type="date"
              name="dob"
              // placeholder="DD"
              required={true}
              value={content.dob}
              onChange={onChange}
            />
          <label htmlFor="mobileNo">Mobile Number</label>
          <input
            id="mobileNo"
            type="text"
            name="mobileNo"
            placeholder="Mobile Number"
            required={true}
            value={content.mobileNo}
            onChange={onChange}
          />
          <label htmlFor="address"> Address</label>
          <input
            id="address"
            type="text"
            name="address"
            placeholder="Address"
            required={true}
            value={content.address}
            onChange={onChange}
          />
           {/* <div className="multiple-input-container"> */}
          <label htmlFor="email"> Driving License Number</label>
          <input
            id="licenseNo"
            type="text"
            name="licenseNo"
            placeholder="License Number"
            required={true}
            value={content.licenseNo}
            onChange={onChange}
          />
           <label htmlFor="licensePhoto"> License Photo </label>
          <input
            id="licensePhoto"
            type="file"
            accept="image/*"
            name="licensePhoto"
            placeholder="License Photo"
            required={true}
            value={content.licensePhoto}
            onChange={onChange}
          />
          <label htmlFor="licenseExpiry"> Driving License Expiry Date</label>
          <input id="licenseExpiry" type="month" name="licenseExpiry" required={true} value={content.licenseExpiry} onChange={onChange} />
          <label htmlFor="PSVBadgeNo"> PSV Badge Number</label>
          <input
            id="PSVBadgeNo"
            type="text"
            name="PSVBadgeNo"
            placeholder="PSV Badge Number"
            required={true}
            value={content.PSVBadgeNo}
            onChange={onChange}
          />
           <label htmlFor="nominee"> Nominee's Name</label>
          <input
            id="nominee"
            type="text"
            name="nominee"
            placeholder="Nominee's Name"
            required={true}
            value={content.nominee}
            onChange={onChange}
          />
          <label htmlFor="nominee_relationship"> Nominee's Relationship</label>
          <input
            id="nominee_relationship"
            type="text"
            name="nominee_relationship"
            placeholder="Nominee's Relationship"
            required={true}
            value={content.nominee_relationship}
            onChange={onChange}
          />
           <label htmlFor="aadharNo"> Aadhar Number</label>
          <input
            id="aadharNo"
            type="text"
            name="aadharNo"
            placeholder="Aadhar Number"
            required={true}
            value={content.aadharNo}
            onChange={onChange}
            pattern="[0-9]{12}"
          />
          <label htmlFor="constituency"> Vidhansoudha Constituency</label>
          <input
            id="constituency"
            type="text"
            name="constituency"
            placeholder="Vidhansoudha Constituency"
            required={false}
            value={content.constituency}
            onChange={onChange}
          />
           <label htmlFor="wardNo"> Ward Number</label>
          <input
            id="wardNo"
            type="text"
            name="wardNo"
            placeholder="Ward Number"
            required={false}
            value={content.wardNo}
            onChange={onChange}
          />
          <label htmlFor="photoURL"> Picture </label>
          <input
            id="photoURL"
            type="file"
            accept="image/*"
            name="photoURL"
            placeholder="Portrait Photo"
            required={true}
            value={content.photoURL}
            onChange={onChange}
          />

          <div className="flex row">
          <input
            id="consent"
            type="checkbox"
            name="consent"
            required={true}
            value={content.consent}
            onChange={onChange}
          />
          
          <label htmlFor="consent"> I will obey the rules and regulations of the union</label>
          </div>

          <div className="signature">
            <div className="signature__header">
            <label htmlFor="signature"> Sign  </label>
            <input type="button" className="clear" onClick={clearSignature} value="Clear" />
            </div>
            <SignaturePad canvasProps={{className: "signatureCanvas"}}
          ref={(ref) => {signPad = ref}} />
          </div>
          <input type="button" onClick={onSubmit} value="Proceed to payment" />
        </section>
      </form>
    </div>
  );
};

export default Register;
