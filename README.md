# SchedulEase

This is a web application for generating timetables for schools and colleges. It is built using Django Rest Framework (DRF) for the backend API and Next.js for the frontend.

## What is a Genetic Algorithm?

Genetic algorithms are metaheuristic methods used to solve computational problems which require large search areas for possible solutions. They very often depend on adaptive systems to perform well in changing environments
The fittest are those with favorable variations, the accumulation of which lead to the evolution of species. The chances for the survival of organisms with injurious variations are rather slim. Thus, evolution is a process of natural selection

## How does genetic algorithm work?

- Generating an initial population of chromosomes.
- Evaluating the suitability of each chromosome (individual) that forms the population.
- Selecting the chromosomes for mating based on the above results.
- Producing offspring by mating (cross over) the selected chromosomes.
- Mutating genes randomly.
- Repeating steps 3-5 until a new population is generated.
- Ending the algorithm when the best solution obtained has not changed after a preset number of generations.

## Installation

## Backend

Clone the repository:

```
git clone https://github.com/your-username/technix-hack.git
```

Navigate to the backend directory:

```
cd technix-hack/server
```

Create a virtual environment:

```
python -m venv env
```

Activate the virtual environment:

```
source env/bin/activate
```

Install the requirements:

```
pip install -r requirements.txt
```

Create a PostgreSQL database and update the DATABASES setting in timetable/settings.py.

Run the database migrations:

```
python manage.py migrate
```

Create a superuser:

```
python manage.py createsuperuser
```

Start the development server:

```
python manage.py runserver
```

The backend API should now be accessible at http://localhost:8000/.

## Frontend

Navigate to the frontend directory:

```
cd ../client
```

Install the dependencies:

```
npm install
```

Create a .env.local file with the following contents:

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api/
```

Start the development server:

```
npm run dev
```

The frontend should now be accessible at http://localhost:3000/.
