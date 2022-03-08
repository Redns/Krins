import os

# npm run build

os.system("git pull origin master")
print("[1/3]sync done")

os.system("git add .")
os.system("git commit -m \"update blog\"")
print("[2/3]add files successfully")

os.system("git push origin master")
print("[3/3]update blog finished")