import time

request_store = {}

# Development Mode
MAX_REQUESTS = 100

TIME_WINDOW = 60


def is_rate_limited(username: str):

    current_time = time.time()

    if username not in request_store:
        request_store[username] = []

    request_store[username] = [
        t
        for t in request_store[username]
        if current_time - t < TIME_WINDOW
    ]

    if len(request_store[username]) >= MAX_REQUESTS:
        return True

    request_store[username].append(current_time)

    return False