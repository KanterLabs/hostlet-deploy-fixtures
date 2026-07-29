use axum::{routing::get, Router};
use std::env;
use tokio::net::TcpListener;

#[tokio::main]
async fn main() {
    let port = env::var("PORT").unwrap_or_else(|_| "3000".to_string());
    let listener = TcpListener::bind(format!("0.0.0.0:{port}")).await.unwrap();
    let app = Router::new()
        .route("/", get(|| async { "hostlet-fixture-rust" }))
        .route("/health", get(|| async { "ok" }));
    axum::serve(listener, app).await.unwrap();
}

