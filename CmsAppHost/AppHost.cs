var builder = DistributedApplication.CreateBuilder(args);

// 1. Spin up the SQL Server Docker container and create a database
var sql = builder.AddSqlServer("sqlserver")
                 .AddDatabase("sqldata");

// 2. Launch the backend and automatically pass it the SQL connection string
var backend = builder.AddProject<Projects.CmsBackend>("backend")
                     .WithReference(sql)
                     .WaitFor(sql);

// 3. Launch the frontend and link it to the backend
builder.AddProject<Projects.CmsFrontend>("frontend")
       .WithReference(backend);

builder.Build().Run();