import Head from "next/head";
import React from "react";
import useSWR from "swr";
import Navbar from "../../components/Layout/Navbar";
import { FcFolder } from "react-icons/fc";
import {
  Button,
  Checkbox,
  Label,
  Modal,
  Table,
  TextInput,
} from "flowbite-react";
import axios from "axios";

import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import ComboInput from "@/components/comboInput";
import { setRevalidateHeaders } from "next/dist/server/send-payload";

const formElements = [
  {
    label: "Course Id",
    id: "courseId",
    type: "text",
    name: "courseId",
    placeholder: "Enter Course Id",
  },
  {
    label: "Course Name",
    id: "courseName",
    type: "text",
    name: "courseName",
    placeholder: "Enter Course Name",
  },
  {
    label: "max_numb_students",
    id: "max_numb_students",
    type: "number",
    name: "max_numb_students",
    placeholder: "Enter Capacity",
  },
  {
    label: "Course Teachers",
    id: "courseTeachers",
    type: "options",
    name: "courseTeachers",
    placeholder: "Enter Course Teachers",
  },
];

const initialValues = {
  courseId: {
    key: "course_number",
    value: "",
  },
  courseName: {
    key: "course_name",
    value: "",
  },
  max_numb_students: {
    key: "max_numb_students",
    value: "",
  },
  instructors: {
    key: "instructors",
    value: "",
  },
};


const Courses = () => {

  const [courses, setCourses] = React.useState([]);

  const reducer = (state, action) => {
    switch (action.type) {
      case "setValues":
        return {
          ...state,
          [action.payload.name]: {
            ...state[action.payload.name],
            value: action.payload.value,
          },
        };
      default:
        return state;
    }
  };

  const [value, setValue] = useState("");

  const handleInputChange = (name) => (e) => {
    dispatch({
      type: "setValues",
      payload: {
        name,
        value: e.target.value,
      },
    });
  };

  const [values, dispatch] = React.useReducer(reducer, initialValues);

  const [teacher, setTeachers] = React.useState([]);
  const [teachersIndex, setTeachersIndex] = React.useState(0);

  const resetForm = () => {
    Object.keys(initialValues).forEach((key) => {
      dispatch({
        type: "setValues",
        payload: {
          name: key,
          value: "",
        },
      });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.values(values).reduce((acc, curr) => {
      if (curr.key === "instructors") {
        acc[curr.key] = [teacher[teachersIndex].value];
        return acc;
      } else {
        acc[curr.key] = curr.value;
      }

      return acc;
    }, {});
    console.log(data);
    try {
      console.log("Adding Course", data);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL_LOCAL}/api/courses`,
        data
      );
      console.log(response.data);
      console.log("Course Added Successfully");
    
      setIsOpen(false);
      // reset form
      resetForm();
      await refecthData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL_LOCAL}/api/courses/${id}`
      );
      console.log(response.data);
      console.log("Course Deleted Successfully");
      await refecthData();
    } catch (error) {
      console.log(error);
    }
  };

  const refecthData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL_LOCAL}/api/courses`
      );
      setCourses(data);
      console.log(data);
      const { data: Teachers } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL_LOCAL}/api/instructors`
      );
      setTeachers(
        Teachers.map((teacher, index) => ({
          id: index,
          name: teacher.name,
          value: teacher.id,
        }))
      );
      console.log(Teachers);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL_LOCAL}/api/courses`
        );
        setCourses(data);
        console.log(data);
        const { data: Teachers } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL_LOCAL}/api/instructors`
        );
        setTeachers(
          Teachers.map((teacher, index) => ({
            id: index,
            name: teacher.name,
            value: teacher.id,
          }))
        );
        console.log(Teachers);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const onClick = () => {
    setIsOpen(true);
  };

  const documentBodyRef = React.useRef(null);

  React.useEffect(() => {
    documentBodyRef.current = document.body;
  }, []);
  
  return (
    <div>
      <Head>
        <title>GeeksBee</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <div className="w-full py-2 px-2"></div> */}

      <main className="overflow-visible ">
        <div className="w-screen md:w-full bg-white z-10 sticky top-0 md:py-1">
          <Navbar headerName="Sections" />
        </div>

        <div className="ml-[3rem] md:w-8/12 p-3 ">
          <div className="w-full flex justify-end py-3">
            <Button onClick={onClick} className="bg-blue-500">
              Add Section
            </Button>
          </div>
          <Table className="shadow-2xl">
            <Table.Head>
              <Table.HeadCell>Course Id</Table.HeadCell>
              <Table.HeadCell>Course Name</Table.HeadCell>
              <Table.HeadCell>Course Instructor</Table.HeadCell>
              <Table.HeadCell>Capacity</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Delete</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {courses.length > 0 &&
                courses.map((course) => (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {course.course_number}
                    </Table.Cell>
                    <Table.Cell>{course.course_name}</Table.Cell>
                    <Table.Cell>
                      {teacher.length > 0 &&
                        teacher.filter(
                          (item) =>
                             course.instructors.includes(item.value)
                        ).map((item) => item.name).join(", ")}
                    </Table.Cell>
                    <Table.Cell>{course.max_numb_students}</Table.Cell>
                    <Table.Cell>
                      <a
                        href="#"
                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        onClick={handleDelete(course.course_number)}
                      >
                        Delete
                      </a>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>

        {/* <div className="mr-[3rem] md:w-4/12 min border"></div> */}

        <Modal show={isOpen} onClose={onClose} root={documentBodyRef.current}>
          <Modal.Header>Add Section</Modal.Header>
          <Modal.Body>
            <form className="flex flex-col gap-4">
              {formElements.map((element, index) =>
                element.type === "options" ? (
                  <div key={index}>
                    {teacher.length > 0 && (
                      <ComboInput
                        items={teacher}
                        index={teachersIndex}
                        setIndex={setTeachersIndex} 
                      />
                    )}
                  </div>
                ) : (
                  <div key={index}>
                    <div className="mb-1 block">
                      <Label htmlFor={element.id} value={element.label} />
                    </div>
                    <TextInput
                      id={element.id}
                      type={element.type}
                      placeholder={element.placeholder}
                      required={true}
                      name={element.name}
                      onChange={handleInputChange(element.name)}
                      // onBlur={handleInputChange(element.name)}
                      value={values[element.name].value}
                      // value={value}
                      // onChange={(e) => setValue(e.target.value)}
                    />
                  </div>
                )
              )}

              <Button onClick={handleSubmit} type="button">
                Add
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      </main>
    </div>
  );
  
};

export default Courses;
