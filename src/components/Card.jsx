import { Link } from "react-router-dom";

function Card({ image , name , firstScreeningDate , ageLimit , id}) {



  return (
    <>
            <Link to={`/movies/${id}`}>
              <div className="relative overflow-hidden rounded-md shadow-md w-75 group cursor-pointer">
                  <div className="group hover:scale-200">
                    <img  
                        src={image}
                        alt="movie image"
                        className="object-cover object-center group-hover:scale-110 transition w-full h-110 duration-300"
                      />
                  </div>
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent">
                  <div className="space-y-1 absolute left-0 right-0 bottom-0 z-10 text-white px-4 pb-4">
                      <h2 className="text-xl font-semibold tracking-wide">
                        {name}
                      </h2>
                    <p>
                      {firstScreeningDate}
                    </p>
                    <p>
                      {ageLimit}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
    </>
  );
}

export default Card;
