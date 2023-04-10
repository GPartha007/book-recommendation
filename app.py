from flask import Flask, jsonify, render_template, request, json
import pickle
import pandas, numpy as np
import string

app = Flask(__name__)

top_50_books = pickle.load(open("top_50.pkl", "rb"))
final_filtered = pickle.load(open("final_filtered.pkl", "rb"))
books_df = pickle.load(open("books_df.pkl", "rb"))
similarity_scores = pickle.load(open("sim_scores.pkl", "rb"))


@app.route("/")
def index():
    title = list(top_50_books["Book-Title"].values)
    author = list(top_50_books["Book-Author"].values)
    votes = list(top_50_books["Average_rating"].values)
    image_url = list(top_50_books["Image-URL-L"].values)

    return render_template("top_50.html", title=title, author=author, votes=votes, image_url=image_url)

# -------------------------------------------------------------------------------------------


def remove_punct(txt):
    text = "".join([char for char in txt if char not in string.punctuation])
    return text.lower()
# -------------------------------------------------------------------------------------------



def Recommend_book(title):
    status = True
    if title in final_filtered.index:
    
        book_index = np.where(final_filtered.index == title)[0][0]
        # 5 recommendations:
        rec_books = sorted(list(enumerate(similarity_scores[book_index])), key = lambda x : x[1], reverse = True)[1:5]
        data = []
        for x in rec_books:
            items   = []
            temp_df = books_df[books_df["Book-Title"] == final_filtered.index[x[0]]]
            items.extend(list(temp_df.drop_duplicates("Book-Title")["Book-Title"].values))
            items.extend(list(temp_df.drop_duplicates("Book-Title")["Book-Author"].values))
            items.extend(list(temp_df.drop_duplicates("Book-Title")["Image-URL-M"].values))
            data.append(items)
        return data
    else:
        status = False
        return status



@app.route("/search", methods=["POST", "GET"])
def search_text():
    text = request.json["search_text"]

    book_name = text.lower()
    top_50_books["Book-Title-Cleaned"] = top_50_books["Book-Title"].apply(
        remove_punct)
    top_50_list = list(top_50_books["Book-Title-Cleaned"].values)

    data = []
    for x in top_50_list:
        book_details = []
        if book_name in x:
            book_details.extend(list(top_50_books.loc[top_50_books["Book-Title-Cleaned"] == x]["Book-Title"].values))
            book_details.extend(list(top_50_books.loc[top_50_books["Book-Title-Cleaned"] == x]["Book-Author"].values))
            book_details.extend(list(top_50_books.loc[top_50_books["Book-Title-Cleaned"] == x]["Average_rating"].values))
            book_details.extend(list(top_50_books.loc[top_50_books["Book-Title-Cleaned"] == x]["Image-URL-L"].values))
            data.append(book_details)

    # return jsonify({"results": data})
    return jsonify({"data" : data})


@app.route("/recommendations")
def recommendation():
    book_names = list(final_filtered.index)
    data = []
    for x in book_names:
        items   = []
        temp_df = books_df[books_df["Book-Title"] == x]
        items.extend(list(temp_df.drop_duplicates("Book-Title")["Book-Title"].values))
        data.append(items)

    return render_template("recommend.html", book_list = data)

@app.route("/recommend", methods = ["POST", "GET"])
def recommend_ajax():
    data_1 = Recommend_book(request.json["book_name"])
    return jsonify({
        "result" : data_1
    })


if __name__ == '__main__':
    app.run(debug=True, port=5000)
