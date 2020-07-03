import React, { useMemo } from "react";
import { useForm } from "react-hook-form";

const encodeForm = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

const Contact = () => {
  const { register, handleSubmit, errors, formState } = useForm();

  const errorText = useMemo(() => {
    if (errors) {
      const errorList = Object.values(errors);
      return errorList.length > 0 && errorList[0].message;
    }
  }, [errors]);

  const submitFunc = async (data) => {
    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeForm({ "form-name": "contact", ...data }),
    });
  };

  return (
    <>
      {formState.isSubmitted ? (
        <p className="text-primary text-sans font-bold tracking-wide text-2xl px-10 text-center">
          Thank you for getting in contact, I will get back to you at the
          earliest possible convenience.
        </p>
      ) : (
        <form
          className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-4 gap-4 justify-start"
          onSubmit={handleSubmit(submitFunc)}
        >
          <input
            type="text"
            name="name"
            ref={register({ required: "Name is required." })}
            placeholder="Your Name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />

          <input
            type="text"
            name="email"
            ref={register({
              required: "Email Address is required.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid Email Address.",
              },
            })}
            placeholder="Your Email Address"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <input
            type="text"
            name="subject"
            ref={register({ required: "Subject is required." })}
            placeholder="Your Subject"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <textarea
            ref={register({ required: "Message is required." })}
            name="message"
            className="row-span-3 md:col-start-2 md:row-start-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Your Message"
            onInput={(e) => {
              e.target.style.height = "";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
          <div className="flex items-baseline">
            <button className="bg-primary text-white font-bold px-4 py-2 mr-4 rounded hover:bg-opacity-75">
              Send Message
            </button>
            <p className="text-red-600">{errorText}</p>
          </div>
        </form>
      )}
    </>
  );
};

export default Contact;
