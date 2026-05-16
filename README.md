# Real-Time AI Event Automation System

A full-stack event-driven AI automation system that processes incoming messages, classifies them using large language models, triggers automated workflows, and displays results in a real-time dashboard.

The system acts as an automation platform for business events, combining artificial intelligence, workflow automation, and live data visualization into a single pipeline.

## Overview

This system takes unstructured input events such as customer messages or system alerts and converts them into structured actions using AI. These structured outputs are then used to trigger automated workflows and store results in a database for real-time monitoring.

The goal is to simulate an operating system for business automation where events are processed, classified, stored, and acted upon automatically.

## System Workflow

User or external event input is received by the frontend or API layer.  
The request is forwarded to a backend endpoint which communicates with a workflow automation engine.  
The workflow engine processes the request and sends it to an AI model for classification.  
The AI model returns a structured response containing intent, priority, and action.  
This data is stored in a database and reflected instantly in the dashboard using real-time updates.

## Features

AI-based event classification that extracts intent, priority, and required action from text input

Workflow automation using external orchestration system for triggering actions

Real-time dashboard that updates automatically when new events are received

Priority-based event handling that separates high and low importance events

Event logging and storage for tracking and monitoring system activity

API-driven architecture that allows external systems to trigger events

## Tech Stack

Frontend built with Next.js and React

Backend built using Next.js API routes

Database powered by Supabase with real-time subscriptions

Workflow automation handled by n8n

AI processing performed using large language model APIs

## How It Works

A message is received through an API endpoint or user interface.  
The message is forwarded to a workflow automation engine.  
The engine sends the message to an AI model for classification.  
The AI model returns structured data including intent, priority, and action.  
The structured event is stored in the database.  
The dashboard listens to database changes and updates in real time.

## Example Event Output

The system converts raw input into structured data in the following format:

{
  intent: refund_request,
  priority: high,
  action: process_refund,
  message: Customer wants refund urgently
}

## Use Cases

Customer support automation and ticket classification

Refund and complaint handling systems

Business event monitoring dashboards

AI-powered operational workflows

Automated decision-making pipelines

## Future Improvements

Advanced analytics and reporting dashboard

Multi-tenant support for SaaS scaling

Retry and failure handling mechanisms for workflows

Role-based access control system

Custom workflow builder for non-technical users

## License

This project is intended for educational and portfolio purposes.
