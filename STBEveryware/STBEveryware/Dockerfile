# Stage 1: Build the application using the .NET SDK
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
# Copy the project file and restore dependencies
COPY ["STBEveryware.csproj", "."]
RUN dotnet restore "./STBEveryware.csproj"
# Copy the rest of the application code
COPY . .
# Build and publish the application
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

# Stage 2: Create the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
# Copy published files from the build stage
COPY --from=build /app/publish .
# Expose port 80 for HTTP traffic
EXPOSE 80
# Configure ASP.NET Core to listen on port 80
ENV ASPNETCORE_URLS=http://+:80
# Run the application
ENTRYPOINT ["dotnet", "STBEveryware.dll"]
