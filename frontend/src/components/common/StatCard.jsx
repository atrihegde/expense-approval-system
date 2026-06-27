export default function StatCard({
    title,
    value,
    icon,
    color,
}) {
    return (
        <div className="col-md-3 mb-4">
            <div className={`card border-0 shadow-sm bg-${color} text-white`}>
                <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                        <h6>{title}</h6>
                        <h2>{value}</h2>
                    </div>

                    <i
                        className={`bi ${icon}`}
                        style={{ fontSize: "2rem" }}
                    ></i>
                </div>
            </div>
        </div>
    );
}