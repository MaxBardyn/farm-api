FROM python:3.8

WORKDIR /posting

RUN apt-get update -y
RUN apt-get install -y git

RUN git clone https://github.com/MaxBardyn/farm-api.git

WORKDIR /posting/farm-api/container/posting

RUN pip3 install requests

CMD ["python3", "post.py"]
