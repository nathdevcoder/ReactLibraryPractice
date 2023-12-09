"use client";
import menu from "@/constant/menu"; 
import React from "react";
import MainMenu from "./menu";

export default function MenuContainer() { 
  return menu.map((params) => <MainMenu {...params} />);
}
