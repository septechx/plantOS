use alloc::{format, string::String};
use defmt::Format;

type Route = (&'static str, Method, fn(&Request) -> Response);

pub struct Router<const N: usize> {
    routes: [Route; N],
}

impl<const N: usize> Router<N> {
    pub fn new(routes: [Route; N]) -> Self {
        Self { routes }
    }

    pub fn route(&self, request: &Request) -> Option<Response> {
        for handler in self.routes {
            if request.method == handler.1 && request.path == handler.0 {
                return Some(handler.2(request));
            }
        }

        None
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Format)]
pub enum StatusCode {
    _200,
}

impl StatusCode {
    pub fn to_header(&self) -> &'static str {
        match self {
            StatusCode::_200 => "200 OK",
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Format)]
pub enum Method {
    Post,
    Get,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Format)]
pub enum ContentType {
    Plain,
    Json,
}

impl ContentType {
    pub fn to_header(&self) -> &'static str {
        match self {
            ContentType::Plain => "text/plain",
            ContentType::Json => "application/json",
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Request {
    pub method: Method,
    pub path: String,
    pub body: String,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Response {
    pub body: String,
    pub content_type: ContentType,
    pub status_code: StatusCode,
}

impl Response {
    pub fn text(body: impl Into<String>) -> Self {
        Self {
            body: body.into(),
            content_type: ContentType::Plain,
            status_code: StatusCode::_200,
        }
    }

    pub fn json(body: impl Into<String>) -> Self {
        Self {
            body: body.into(),
            content_type: ContentType::Json,
            status_code: StatusCode::_200,
        }
    }

    pub fn status(mut self, code: StatusCode) -> Self {
        self.status_code = code;
        self
    }

    pub fn finalize(self) -> String {
        format!(
            "HTTP/1.0 {}\r\nContent-Type: {}\r\n\r\n{}\r\n",
            self.status_code.to_header(),
            self.content_type.to_header(),
            self.body
        )
    }
}
