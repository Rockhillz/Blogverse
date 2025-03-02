import React from "react";
import "@testing-library/jest-dom"; 
import { render, screen, fireEvent } from "@testing-library/react";
import NavigationBar from "../src/components/NavigationBar";
import { AuthContext } from "../src/context/authContext";
import { BrowserRouter } from "react-router-dom";

describe("NavigationBar", () => {
  it("renders login and signup buttons when not authenticated", () => {
    render(
      <AuthContext.Provider value={{ isAuthenticated: false }}>
        <BrowserRouter>
          <NavigationBar />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Create Account")).toBeInTheDocument();
  });

  it("renders create post, dashboard, and logout when authenticated", () => {
    render(
      <AuthContext.Provider value={{ isAuthenticated: true, logout: jest.fn() }}>
        <BrowserRouter>
          <NavigationBar />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Create Post")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Sign Out")).toBeInTheDocument();
  });

  it("calls logout when Sign Out button is clicked", () => {
    const mockLogout = jest.fn();

    render(
      <AuthContext.Provider value={{ isAuthenticated: true, logout: mockLogout }}>
        <BrowserRouter>
          <NavigationBar />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const signOutButton = screen.getByText("Sign Out");
    fireEvent.click(signOutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
