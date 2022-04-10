import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Card, Col, Container, Row } from "react-bootstrap";
import dayjs from "dayjs";
import { CompositeDecorator } from "draft-js";
import { Sidenav } from "../components/navbar";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_POST, QUERY_ALL_ADMINS, QUERY_ALL_BIRTHDAYS, QUERY_ALL_POSTS, QUERY_ME } from "../utils/gql";
import Auth from "../utils/auth";
import "./style.css";

const Travel = () => {

}

export default Travel;