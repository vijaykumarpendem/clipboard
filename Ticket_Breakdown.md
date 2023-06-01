# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

My Understanding:
1. Agents and Facilities are independent entities
2. Facilities create shifts based on their requirement
3. Agents are assigned to the shifts of the facility
4. When Report is generated we are using our internal Agent Id to show in the report
5. New Requirement
    - Facility can add custom id to an Agent who they work with
    - In the report, the Agent should be shown with the custom id of the Facility that it has assigned earlier


Tasks
1. Add new DB Table: AgentFacility table

Description: Add a new table in DB with three columns: AgentId, FacilityId and CustomId. Primary Key: combination of (AgentId and FacilityId) and combination of (FacilityId and CustomId) should be unique.

Acceptance Criteria:
    a. Creation of DB in Dev and Staging Env

Estimate: 0.5 days

2. Add API to allow Facility to assign an id to an Agent

Description: Create a new API that takes three params: AgentId(Id in our DB), FacilityId, CustomId(Id given by Client Facility). Response could be { success: true/false }

Acceptance Criteria: 
    a. API Implementation
    b. Unit Tests
    c. Deployment to Dev and Staging Env

Estimate: 1.5 days

3. Make changes in the generateReport API to use custom id from AgentFacility table instead of id of Agent

Description: While generating report for a Facility, after getting Shifts and knowing who the Agent was for that shift, look for the AgentId, FacilityId mapping in the AgentFacility table and get the CustomId, to include that in the report under AgentId column.

Acceptance Criteria: 
    a. API Change
    b. Unit Tests
    c. Testing the report generated with CustomId
    d. Deployment to Dev and Staging Env

Estimate: 1.5 days