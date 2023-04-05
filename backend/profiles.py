global accounts
accounts = [
    {
        "email": "test@1.com",
        "password": "test1",
        "name": "Test User1",
        "rating": 4.5,
        "numRatings": 3,
        "personality" : {
            "p1": 2,
            "p2": 3,
            "p3": 4,
            "p4": 1,
            "p5": 5,
        },
        "rewards": ["r1", "r2"]
    }
]

def getAccount(email):
    for account in accounts:
        if account['email'] == email:
            return account
    return None

def addAccount(account):
    accounts.append(account)
    return account

def updateAccount(account):
    delAccount(account['email'])
    addAccount(account)
    return account

def delAccount(email):
    global accounts
    for idx, account in enumerate(accounts):
        if account['email'] == email:
            accounts.pop(idx)
            return True
    return False

# Testing

# print(getAccount('test@1.com'))
# print(addAccount({
#         "email": "test@12.com",
#         "password": "test1",
#         "name": "Test User1",
#         "rating": 4.5,
#         "numRatings": 3,
#         "personality" : {
#             "p1": 2,
#             "p2": 3,
#             "p3": 4,
#             "p4": 1,
#             "p5": 5,
#         },
#         "rewards": ["r1", "r2"]
#     }))
# print(getAccount('test@12.com'))
# print(updateAccount({
#         "email": "test@12.com",
#         "password": "test1234",
#         "name": "Test User1",
#         "rating": 4.5,
#         "numRatings": 3,
#         "personality" : {
#             "p1": 2,
#             "p2": 3,
#             "p3": 4,
#             "p4": 1,
#             "p5": 5,
#         },
#         "rewards": ["r1", "r2"]
#     }))
# print(getAccount('test@12.com'))
# print(accounts)
# print(delAccount('test@12.com'))
# print(accounts)