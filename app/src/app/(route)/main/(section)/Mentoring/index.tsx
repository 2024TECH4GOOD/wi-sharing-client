"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import MenteeMentoring from "./MenteeMentoring";
import MentorMentoring from "./MentorMentoring";

export default function Mentoring() {
  const router = useRouter();
  const role = localStorage.getItem("role");
  console.log(role);
  return (
    role === 'YOUTH' ?
    <MenteeMentoring/> : 
   <MentorMentoring/>
    
  );
}
