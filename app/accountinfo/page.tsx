"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";

const accInfo = () => {
  const router = useRouter();
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [rememberPassword, setRememberPassword] = useState(false);
  const handleBtn = () => {
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Remember Password:", rememberPassword);

    // Redirect to home page after successful login
    router.push("/");
  };
  // State to manage the form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [password3, setPassword3] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  // Load saved email and password from local storage on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    const storedPassword = localStorage.getItem("rememberedPassword");
    const storedRememberPassword = localStorage.getItem("rememberPassword");

    if (storedEmail && storedRememberPassword === "true") {
      setEmail(storedEmail);
      setPassword(storedPassword || "");
      setRememberPassword(true);
    }
  }, []);

  // Handle form submission
  const handleLogin = () => {
    // Save email and password to local storage if "Remember password" is checked
    if (rememberPassword) {
      localStorage.setItem("rememberedEmail", email);
      localStorage.setItem("rememberedPassword", password);
      localStorage.setItem("rememberPassword", "true");
    } else {
      // Clear saved data if "Remember password" is unchecked
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
      localStorage.removeItem("rememberPassword");
    }

    // Continue with your login logic here
    // ...

    // Redirect to home page after successful login
    router.push("/");
  };
  return (
    <>
      <Container
        className="d-flex flex-column align-items-center mt-5 mb-5"
        style={{ width: "600px", border: "1px solid #ccc", padding: "20px", borderRadius: "10px" }}
      >
        <h1>Thông tin tài khoản</h1>
        <Form className="mt-3">
          <Form.Group controlId="name">
            <Form.Label>Họ Tên</Form.Label>
            <Form.Control placeholder="Nhập Họ Tên" />
          </Form.Group>

          <Form.Group controlId="email" className="mt-2">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Nhập Email" value={email} />
          </Form.Group>

          <Form.Group controlId="phone" className="mt-2">
            <Form.Label>SĐT</Form.Label>
            <Form.Control placeholder="Nhập SĐT" />
          </Form.Group>

          <Form.Group controlId="address" className="mt-2">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control placeholder="Nhập địa chỉ" />
          </Form.Group>

          <Button
            variant="success"
            type="button"
            className="w-100 mt-3"
            onClick={handleLogin}
          >
            Lưu Thông Tin
          </Button>
        </Form>
      </Container>
      <Container
        className="d-flex flex-column align-items-center mt-5 mb-5"
        style={{ width: "600px" , border: "1px solid #ccc", padding: "20px", borderRadius: "10px"}}
      >
        <h1>Thay đổi mật khẩu</h1>
        <Form className="mt-3">
        <Form.Group controlId="password" className="mt-2">
            <Form.Label>Mật khẩu hiện tại</Form.Label>
            <div className="position-relative">
                <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                variant="outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                className="position-absolute end-0 translate-middle-y border-0"
                style={{ top: '50%', transform: 'translateY(-50%)' }}
                >
                {showPassword ? 'Ẩn' : 'Hiện'}
                </Button>
            </div>
            </Form.Group>

            <Form.Group controlId="password2" className="mt-2">
            <Form.Label>Mật khẩu mới</Form.Label>
            <div className="position-relative">
                <Form.Control
                type={showPassword2 ? 'text' : 'password'}
                placeholder="Nhập mật khẩu"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                />
                <Button
                variant="outline-secondary"
                onClick={() => setShowPassword2(!showPassword2)}
                className="position-absolute end-0 translate-middle-y border-0"
                style={{ top: '50%', transform: 'translateY(-50%)' }}
                >
                {showPassword2 ? 'Ẩn' : 'Hiện'}
                </Button>
            </div>
            </Form.Group>
            <Form.Group controlId="password3" className="mt-2">
            <Form.Label>Xác nhận mật khẩu</Form.Label>
            <div className="position-relative">
                <Form.Control
                type={showPassword3 ? 'text' : 'password'}
                placeholder="Nhập mật khẩu"
                value={password3}
                onChange={(e) => setPassword3(e.target.value)}
                />
                <Button
                variant="outline-secondary"
                onClick={() => setShowPassword3(!showPassword3)}
                className="position-absolute end-0 translate-middle-y border-0"
                style={{ top: '50%', transform: 'translateY(-50%)' }}
                >
                {showPassword3 ? 'Ẩn' : 'Hiện'}
                </Button>
            </div>
            </Form.Group>

          <Button
            variant="success"
            type="button"
            className="w-100 mt-3"
            onClick={handleLogin}
          >
            Lưu Thông Tin
          </Button>
        </Form>
      </Container>
    </>
  );
};
export default accInfo;
