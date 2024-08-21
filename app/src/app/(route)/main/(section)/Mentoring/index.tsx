"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import MenteeMentoring from "./MenteeMentoring";

export default function Mentoring() {
  const router = useRouter();
  return (
    <MenteeMentoring/>
  );
}
